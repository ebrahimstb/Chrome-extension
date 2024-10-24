
let myLeads =[ ]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// how we bring the leads from the local storage to the dom using parse it persist your leads across refresh 
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem ("myLeads",JSON.stringify(myLeads))  
    render(myLeads)
    })
})

//this loop through the array of leads and it brings all in the array out of the array to the DOM 
function render(leads) {
    let listItems = ""
for (let i = 0; i < leads.length; i++) {
    listItems += ` <li>
    <a target= '_blank' href= ' ${leads[i]}'>
             ${leads[i]}
         </a>
    </li> `;
}
ulEl.innerHTML = listItems 
} 

//to delete the leads from the local storage set the leads to empty and render the empty leads out to the DOM so its cleared 
delBtn.addEventListener('dblclick', function() {
    localStorage.clear( )
    myLeads= []
    render(myLeads)
  });

//the eventlistener listens to click and after we click to push the input value out to the dom it alsi pass it down to our computer local storage and render the values out it persist your leads across refresh
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem ("myLeads",JSON.stringify(myLeads))  
    render(myLeads)
})

