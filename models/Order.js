import moment from 'moment';
class Order {
    constructor(id,items,totalAmount,orderedDate) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.orderedDate = orderedDate;
    }

    get readableDate() {
        // return this.orderedDate.toLocaleDateString('en-EN', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })

        return (moment(this.orderedDate).format('MMMM Do YYYY, hh:mm'));
    }
}
 
export default Order