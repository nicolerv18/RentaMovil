export function calculateTotal(
    price:number,
    days:number,
    insurancePrice:number = 0
){

return (
    price * days
    +
    insurancePrice
);

}