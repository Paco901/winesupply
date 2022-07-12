$(document).ready(function () {
  init();

  window.onhashchange = function () {
    init();
  };
});

function init() {
  var shippingHash = 'shipping';
  var profileHash = 'profile';
  var paymentHash = 'payment';

  if (location.href.indexOf(profileHash) >= 0) {
    if ($(window).width() > 768) {
      $('#payment-data').css('margin-left', '0');
      $('#go-to-cart-button').css('margin', '58px 0 0');
    }
  }

  if (location.href.indexOf(shippingHash) >= 0) {
    if ($(window).width() > 768) {
      $('#payment-data').css('margin-left', '52%');
      $('#go-to-cart-button').css('margin', '58px 0 0');
    }
  }

  if (location.href.indexOf(paymentHash) >= 0) {
    if ($(window).width() > 768) {
      $('#go-to-cart-button').css('margin', '0');
    }
  }
}

document.addEventListener("DOMCOntentLoad",()=>setCustomizations())

$(window).load(function() {
  setCustomizations();
});

$(window).on("orderFormUpdated.vtex", function(evt, orderForm) {
  console.log("ORDERFORM",orderForm)
  setCustomizations();
});

window.addEventListener("hashchange",()=>setCustomizations())

function setPhoneField () {
  getElementLoad(".box-client-info div.client-phone p.input",($phone)=>{
    const $newField = document.createElement("div")
    const $input = document.createElement("input")

    $newField.id = "new-phone"
    $newField.style.width = "100%"
    $input.type = "tel"
    $input.classList.add("input-mini")
    $input.maxLength = "14"
    $input.defaultValue = clientProfileData.phone()==="0"?'':clientProfileData.phone()

    if(vtex.phone.validate(clientProfileData.phone(),"54")) $input.classList.add("success")


    $input.onchange = (e)=>{

      if($newField.querySelector(".error"))$newField.querySelector(".error").remove()

      if(vtex.phone.validate(e.target.value,"54")){
        clientProfileData.update({...clientProfileData.toJSON(),phone: e.target.value})
        clientProfileData.isValid()
        $input.classList.add("success")
      }else{
        clientProfileData.phone(``)
        $input.classList.remove("success")
        const $error = document.createElement("span")
        $error.className = "help error error-custom"
        $error.textContent = "Introduzca un número de teléfono válido, por favor."
        $newField.appendChild($error)
      }
    }

    $newField.appendChild($input)

    if($phone){
      const $beforeField = $phone.querySelector("#new-phone")
      if($beforeField) $beforeField.remove()
      $phone.appendChild($newField)
    }
  })
}

function setPostalCodeField () {
  getElementLoad("#ship-postalCode",($input)=>{
    $input.type = "tel"
  })
}

function setCustomizations (){
  setPhoneField()
  setPostalCodeField()
}


function getElementLoad(selector,callback){
  const $element = document.querySelector(selector)
  if($element) callback($element)
  else setTimeout(()=>getElementLoad(selector,callback),500)
}


const d = document

d.addEventListener('DOMContentLoaded',appOnLoad)

function appOnLoad () {
  loadFonts()
}

const loadFonts = () => {
  const LinkStylesOne = d.createElement("link");
  const LinkStylesTwo = d.createElement("link");
  const LinkStylesThree = d.createElement("link");

  LinkStylesOne.rel = "preconnect";
  LinkStylesOne.href = "https://fonts.googleapis.com";

  LinkStylesTwo.rel = "preconnect";
  LinkStylesTwo.href = "https://fonts.gstatic.com";
  LinkStylesTwo.setAttribute("crossorigin", null);

  LinkStylesThree.rel = "stylesheet";
  LinkStylesThree.href ="https://fonts.googleapis.com/css2?family=Aleo:wght@300;400;700&family=Baskervville:ital@0;1&family=Libre+Baskerville:wght@700&display=swap";

  d.head.appendChild(LinkStylesOne);
  d.head.appendChild(LinkStylesTwo);
  d.head.appendChild(LinkStylesThree);
}
