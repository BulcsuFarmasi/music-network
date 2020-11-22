export const formatEpochTime = (epochTime:number):string => {
    if (epochTime) {
        const date:Date = new Date(epochTime);
        return `${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}. ${date.getHours()}:${date.getMinutes()}`;
    } else {
        return "";
    }
};