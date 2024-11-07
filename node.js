let array = [232,4,5,5,6,5,3,3,];
let newarray=[]
for(let i =0;i<array.length;i++)
{
    let flag=0;
    for(let j=i+1;j<array.length;j++)
    {
        if(array[i]===array[j])
        {
            flag=1;
            break;
        }
    }
    if(flag!==1)
    {
       newarray.push(array[i]);
    }
}
console.log(newarray);
