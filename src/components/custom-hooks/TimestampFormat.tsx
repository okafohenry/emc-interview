export function TimestampFormat(timestamp: string | Date) {
    if(!timestamp){ return };

    const currentTime: any = new Date();
    const previousTime: any = new Date(timestamp);
    const timeDifference = Math.abs(currentTime - previousTime);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else if (minutes > 0) {
        return `${minutes}mins ago`;
    } else {
        return 'Just now';
    }
}


