if(localStorage.getItem('visits')){
    let visits = parseInt(localStorage.getItem('visits')) + 1;
    localStorage.setItem('visits', visits);
    console.log(`你已经访问了 ${visits} 次`);
} else {
    localStorage.setItem('visits', 1);
    console.log("第一次访问本站");
}
