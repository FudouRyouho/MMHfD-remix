import React, {useState, useEffect, useRef} from "react";
import { AlertCircle, CheckCircle, CircleX, Info, X } from "../../icons/IconBase";
import { NotificationChannel, NotificationType } from "~/store/NotificationsSlice";
import { Button } from "@headlessui/react";



interface IProps {
    type: NotificationType;
    message: string;
    icon?: React.ReactNode;
    onClose: () => void;
    duration?: number;
    channel?: NotificationChannel;
}

const defaultIcons: Record<NotificationType, React.ReactNode> = {
    success: <CheckCircle className="mr-2"/>,
    error: <CircleX className="mr-2"/>,
    warning: <Info className="mr-2"/>,
    info: <AlertCircle className="mr-2"/>,
}

const typeStyles: Record<NotificationType, string> = {
    success: 'bg-emerald-500/10 text-emerald-300 p-4 rounded flex justify-between',
    error: 'bg-red-500/10 text-red-300 p-4 rounded flex justify-between',
    warning: 'bg-yellow-500/10 text-yellow-300 p-4 rounded flex justify-between',
    info: 'bg-blue-500/10 text-blue-300 p-4 rounded flex justify-between',


  }

const NotificationPush : React.FC<IProps> = ({type, message, icon, onClose, duration = 5000, channel = 'web'}) => {
    const [isVisible, setIsVisible] = useState(true)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const startTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }, duration)
      }

      useEffect(() => {
        startTimer()
        return () => {
          if (timerRef.current) clearTimeout(timerRef.current)
        }
      }, [duration])
    
      const handleMouseEnter = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    
      const handleMouseLeave = () => {
        startTimer()
      }
    
      if (!isVisible) return null

    return (
      <div className="bg-zinc-900/90">
        <div
        className={`transition-all duration-300 ${
          typeStyles[type]
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        role="alert"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex gap-1">
          {icon || defaultIcons[type]}
          <div className="mr-1 font-bold">{message}</div>
        </div>
        
        <Button
          className="group transition-all duration-200 ease-in-out inline-flex items-center"
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          aria-label="Cerrar"
        >
          <X className="group-hover:text-red-500 group-active:text-white group-hover:rotate-90 group-active:-rotate-90 transition-all duration-300" />
        </Button>
      </div></div>
    )
}


export default NotificationPush