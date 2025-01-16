import { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";

export default function DefaultNotification({ notification }: { notification: Notification }) {

    const formatNotificationType = (type: string) => {
        const parts = type.split('\\');
        const className = parts[parts.length - 1];
        return className
            .replace('Notification', '')
            .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add spaces between camelCase words
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <strong className="text-primary">{formatNotificationType(notification.type)}</strong>
                <small className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(notification.created_at))}</small>
            </div>
            <div>
                <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: notification.data.message.replace(/_(\S)_/g, '<i>$1</i>').replace(/\*(\S)\*/g, '<b>$1</b>') }}></div>
            </div>
        </div>
    );
}

