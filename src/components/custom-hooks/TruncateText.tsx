export function TruncateText(data:string, maxLength: number){
    if(!data || !maxLength) return;

    const res = data.length <= maxLength ? data : data.substring(0, maxLength) + '...';

    return res;
}