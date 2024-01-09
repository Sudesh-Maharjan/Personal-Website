// utils.js
export const calculateTimeAgo = (updateTime) => {
   const now = new Date();
   const updateDate = new Date(updateTime);
   const timeDifference = now - updateDate;
   const minutes = Math.floor(timeDifference / (1000 * 60));

   if (minutes < 1) {
       return 'Updated just now';
   } else if (minutes < 60) {
       return `Updated ${minutes} minutes ago`;
   } else if (minutes < 1440) {
       const hours = Math.floor(minutes / 60);
       return `Updated ${hours} hours ago`;
   } else if (minutes < 10080) {
       const days = Math.floor(minutes / 1440);
       return `Updated ${days} days ago`;
   } else if (minutes < 40320) {
       const weeks = Math.floor(minutes / 10080);
       return `Updated ${weeks} weeks ago`;
   } else if (minutes < 525600) {
       const months = Math.floor(minutes / 40320);
       return `Updated ${months} months ago`;
   } else {
       const years = Math.floor(minutes / 525600);
       return `Updated ${years} years ago`;
   }
};
