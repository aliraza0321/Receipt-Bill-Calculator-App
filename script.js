let input=document.querySelector("#recipe");
let amount=document.querySelector("#amount");
let form=document.querySelector("#form");
let listItems=document.querySelector("#list-Items");
let totalBill=document.querySelector("#total-bill");
let total=0;
let items=JSON.parse(localStorage.getItem("items")) || [];
let clearBtn=document.querySelector("#clear-btn");

let printBtn=document.querySelector("#print-btn");

printBtn.addEventListener("click",()=>{
    window.print();
});

clearBtn.addEventListener("click",()=>{
    items=[];
    localStorage.setItem("items",JSON.stringify(items));
    renderItems();
});

let renderItems=()=>{
    listItems.innerHTML="";
    total=0;
    if( items.length===0)
    {
        totalBill.innerText=0;
        return;
    }
    items.forEach((item, index)=>{
        let li=document.createElement("li");
        li.innerHTML=`${item.name} - $${item.amount} 
                    <button data-index="${index}" class="delete-btn">Delete</button>`;
        total+=item.amount;
        listItems.appendChild(li);
        totalBill.innerText=total;
    });

}
renderItems();
listItems.addEventListener("click",(e)=>{
    if(e.target.innerText==="Delete")
    {

        let parent=e.target.parentElement;
        totalBill.innerText=total - parent.amount;
        let index=e.target.dataset.index;
        items.splice(index,1);
        localStorage.setItem("items",JSON.stringify(items));
        renderItems();

    }
});

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj={
        name:input.value,
        amount:parseInt(amount.value)
    };
    items.push(obj);
    localStorage.setItem("items",JSON.stringify(items));
    renderItems();
    form.reset();
});

