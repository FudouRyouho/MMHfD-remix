import { scrapeBossData } from "~/lib/scraper";
import { Temporal } from '@js-temporal/polyfill';
import EventEmitter from 'events';

class BossTrackerService extends EventEmitter {
  localCache: any; // Declarar localCache
  REFRESH_INTERVAL: Temporal.Duration; // Declarar REFRESH_INTERVAL
  isSending: boolean; // Declarar isSending
  callCount: number; // Declarar callCount

  constructor() {
    super();
    this.localCache = null;
    this.REFRESH_INTERVAL = Temporal.Duration.from({ seconds: 10 });
    this.isSending = false;
    this.callCount = 0;
  }

  async start() {
    this.sendEvent();
    setInterval(() => this.sendEvent(), 15000);
  }

  async sendEvent() {
    if (this.isSending) {
      return;
    }
    this.isSending = true;
    try {
      const now = Temporal.Now.instant();
      if (
        !this.localCache ||
        now.since(
          typeof this.localCache.lastUpdate === "number"
            ? Temporal.Instant.fromEpochMilliseconds(this.localCache.lastUpdate).toZonedDateTimeISO("America/Buenos_Aires").toInstant()
            : this.localCache.lastUpdate.toInstant()
        ).seconds >= this.REFRESH_INTERVAL.seconds
      ) {
        this.localCache = {
          current: await scrapeBossData(),
          historical: [],
          lastUpdate: Temporal.Now.zonedDateTimeISO(),
        };
      }

      this.emit('bossDataUpdate', JSON.stringify(this.localCache)); // Emitir el evento
      //console.log('Data emitted:', JSON.stringify(this.localCache));
    } catch (error) {
      console.error("Error en sendEvent:", error);
    } finally {
      this.isSending = false;
      this.callCount++;
      console.log(`sendEvent llamado ${this.callCount} veces.`);
    }
  }
}

const bossTrackerService = new BossTrackerService();

export default bossTrackerService;