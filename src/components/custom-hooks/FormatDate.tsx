export function formatDate(date: Date){
    const currentDate = new Date(date);
    const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>');
    
    return formattedDate;
}