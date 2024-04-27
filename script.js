function fetchData(){
    const apiUrl =
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";

    fetch(apiUrl)
     .then((res)=> res.json(res))
     .then((data)=>{
        console.log(data);
        const product= data.product;


        //image
        // const mainImg= document.querySelector(".product-images");
        // mainImg.innerHTML=`<img src=${product.images[0].src} alt=${product.images[0].alt} />`;


        //vendor
        const productVendor = document.querySelector(".vendor")
        productVendor.innerHTML = product.vendor

        //title
        const productTitle = document.querySelector(".title")
        productTitle.innerHTML = product.title

        //price
        const productPrice = document.querySelector(".price")
        productPrice.innerHTML = product.price
        //percentageOff
        const price = parseFloat(
            product.price.replace("$", "")
        )
        const compareAtPrice = parseFloat(
            product.compare_at_price.replace("$", "")
        )
        const percentageOff = ((compareAtPrice - price) / compareAtPrice) * 100;
        const productPercent = document.querySelector(".percentageOf")
        productPercent.innerHTML = `${percentageOff.toFixed(0)}% Off`
        //compare price
        const productComparePrice = document.querySelector(".compare-price")
        productComparePrice.innerHTML = product.compare_at_price


        //color selector
        const colorContainer= document.getElementById("color_selector");
        createColorSquares(colorContainer, product.options[0].values);

        //size selector
        const sizeContainer= document.getElementById("size_selector");
        createSizeSelectors(sizeContainer, product.options[1].values);


        //quantity
        const decrementBtn=document.getElementById("minus");
        const incrementBtn=document.getElementById("plus");
        const qty=document.getElementById("counter");
        let qtyVal=1;
        function updateQty(){
            qty.textContent=qtyVal;
        }
        decrementBtn.addEventListener("click", function(){
            qtyVal--;
            if(qtyVal<1){
                qtyVal=1;
            }
            updateQty();
        });
        incrementBtn.addEventListener("click", function(){
            qtyVal++;
            updateQty();
        });

        //add to cart
        // const addToCartBtn=document.getElementById("Addtocart_Button");
        const addToCartBtn=document.querySelector(".addtocart")
        addToCartBtn.addEventListener("click", function(){
            const cartItem= document.querySelector(".onAdd");
            cartItem.innerHTML= `${product.title} with color ${colorSelected} and Size ${sizeSelected} is added to cart`;
            cartItem.style.display="flex";
            cartItem.style.fontSize="14px";
            

        });


        const productDescription = document.querySelector(".description")
        productDescription.innerHTML = product.description

        
     })





     function createHTMLElement(tag, className, textContent) {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = textContent;
        return element;
    }

    function createColorSquares(container, colors){
        colors.forEach(colorObject => {
            const colorVal= Object.values(colorObject)[0];
            const colorSquare= document.createElement("div");
            const colorSquareWrap= document.createElement("div");

            colorSquare.classList.add("color_square");
            //colorSqaure.textContent="";
            colorSquareWrap.classList.add(`${colorVal}`);
            colorSquareWrap.classList.add("Wrapper_class");
            colorSquare.style.backgroundColor=colorVal;

            //console.log(Object.keys(colorObject));
            //colorSquareWrap.style.border=`2px solid ${colorVal}`;
            colorSquareWrap.style.padding="5px";

            colorSquare.value=Object.keys(colorObject)[0];
            colorSquareWrap.appendChild(colorSquare);
            container.appendChild(colorSquareWrap);

            colorSquare.addEventListener("click", function(e){
                
                const wrappers= document.getElementsByClassName("Wrapper_class");
                for(let i=0; i<wrappers.length; i++){
                    wrappers[i].style.border="none";
                   // console.log(wrappers[i]);
                }
                //colorSquare.style.border="2px solid black";
                const currentWrapper=document.getElementsByClassName(`${colorVal}`);
                currentWrapper[0].style.border=`2px solid ${colorVal}`;
                colorSelected=e.target.value;
                console.log(colorSelected);
            });
        });
    }

    function createSizeSelectors(container, sizes){
        let selectedInput;
        sizes.forEach(sizeObject => {
            //console.log(sizeObject);
            const radioWrapper= document.createElement("div");
            const radioInput= document.createElement("input");
            radioWrapper.classList.add("radio_wrapper");
            radioInput.type='radio';
            radioInput.name='size';
            const radioLabel= document.createElement("label");
            radioLabel.textContent=sizeObject;
            radioInput.value=sizeObject;
            radioWrapper.appendChild(radioInput);
            radioWrapper.appendChild(radioLabel);
            container.appendChild(radioWrapper);

            radioInput.addEventListener("click", function(e){
                if(selectedInput){
                    selectedInput.classList.remove("selected_size");
                }
                selectedInput=radioWrapper;
                radioWrapper.classList.add("selected_size");
                sizeSelected=e.target.value;
                console.log(sizeSelected);
            })
            
        })
    }
}
fetchData()


