// lib/server/sse.server.ts
import { EventEmitter } from 'events';
import { ReadableStream } from 'node:stream/web';
import { LoaderFunction } from '@remix-run/node';

export class SSEService {
  private emitter: EventEmitter;
  private eventName: string;
  private dataSource: () => EventEmitter; // Función que devuelve el EventEmitter de la fuente de datos

  constructor(eventName: string, dataSource: () => EventEmitter) {
    this.emitter = new EventEmitter();
    this.eventName = eventName;
    this.dataSource = dataSource;
  }

  getLoader(): LoaderFunction {
    return ({ request }) => {
      console.log('SSE connection requested');
      return new Promise((resolve) => {
        const stream = new ReadableStream({
          start: (controller) => {
            const sendData = (data: string) => controller.enqueue(`data: ${data}\n\n`);
            const sourceEmitter = this.dataSource();
  
            const errorHandler = (error: any) => {
              console.error('SSE Error:', error);
              console.log('errorHandler called with error:', error);
              controller.error(error); // Cierra el stream con un error
              resolve(new Response(null, { status: 500 })); // Responde con un error 500
            };
  
            sourceEmitter.on(this.eventName, sendData);
            sourceEmitter.on('error', errorHandler); // Escucha errores del emitter
  
            request.signal.addEventListener('abort', () => {
              console.log('SSE connection aborted');
              sourceEmitter.off(this.eventName, sendData);
              sourceEmitter.off('error', errorHandler);
              controller.close();
              resolve(new Response(null, { status: 204 }));
            });
          },
        });
  
        resolve(
          new Response(stream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              Connection: 'keep-alive',
            },
          })
        );
      });
    };
  }

  getEmitter(): EventEmitter {
    return this.emitter;
  }
}