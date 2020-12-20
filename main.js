!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}(self,(function(){return(()=>{"use strict";var t={231:(t,e,n)=>{n.r(e);const o={weight:"kg",pcs:"pcs."},r="myShopping";class i{constructor(t,e,n){this.name=t,this.quantity=e,this.units=n,this.bought=!1}editQuantity(t){this.quantity=t}editName(t){this.name=t}editUnits(t){this.units=t}editBought(){this.bought=!this.bought}}class a{constructor(t){this.name=t,this.productList=[]}changeName(t){this.name=t}addProduct(t){this.productList.push(t)}deleteProduct(t){const e=this.productList.filter((e=>e!==t));this.productList=e}}class u{constructor(t){this.categoryList=[],this.total=0,t.forEach((t=>{const e=new a(t);this.categoryList.push(e)}))}addProduct(t,e,n,o){const r=new i(t,e,n);o.addProduct(r),this.sumTotal()}deleteProduct(t,e){e.deleteProduct(t),this.sumTotal()}addCategory(t){const e=new a(t);this.categoryList.push(e)}deleteCategory(t){const e=this.categoryList.filter((e=>e!==t));this.categoryList=e,this.sumTotal()}sumTotal(){let t=0;for(let e of this.categoryList)t+=e.productList.reduce(((t,e)=>e.units===o.weight?t+1:t+e.quantity),0);this.total=t}}function c(t,e){const n=document.createElement(t);for(let t in e)n.classList.add(e[t]);return n}function s(t,e){const n=document.createElement(t);for(let t in e)n.setAttribute(e[t][0],e[t][1]);return n}function d(t,e,n){const o=c("button",t);return o.setAttribute("id",e),o.textContent=n,o}function l(t,e){const n=c("button",t),o=c("i",e);return n.appendChild(o),n}function p(t,e){for(let n in e)t.appendChild(e[n]);return t}function m(t,e,n){const o=c("label",t);return o.setAttribute("for",e),o.textContent=n,o}function f(){let t=c("div",["btn__group"]),e=l(["btn","btn__boardless","btn__edit"],["far","fa-edit"]),n=l(["btn","btn__boardless","btn__delete"],["far","fa-trash-alt"]);return p(t,[e,n]),[t,e,n]}function g(){document.querySelector("#overlay").classList.toggle("active")}function y(t){g(),t.innerHTML="",t.classList.toggle("inactive")}function h(){g();const t=document.querySelector("#form");return t.classList.toggle("inactive"),t}function b(t){const e=d(["btn","btn__cancel"],"cancel","Cancel");return e.addEventListener("click",(()=>{y(t)})),e}function v(){const t=h(),e=m(["form__label"],"category-name","Category name"),n=s("input",[["name","category-name"],["placeholder","Enter category name"],["class","form__input"]]);n.required=!0;let o=c("div",["form__group"]);p(o,[e,n]);const r=d(["btn","btn__add"],"add-category","+ Add new category");r.setAttribute("type","submit");const i=b(t);let a=c("div",["btn__group"]);return p(a,[r,i]),{form:t,nameInput:n,addButton:r,buttonGroup:a,nameGroup:o}}function _(t){const e=h(),n=m(["form__label"],"category","Product name"),r=s("input",[["name","product-name"],["placeholder","Enter product name"],["class","form__input"]]);r.required=!0;let i=c("div",["form__group"]);p(i,[n,r]);const a=m(["form__label"],"category","Choose category");let u=function(t){const e=s("select",[["name","category"]]);e.classList.add("form__select");for(let n of t){let t=document.createElement("option");t.textContent=n.name,e.appendChild(t)}return e}(t),l=c("div",["form__group"]);p(l,[a,u]);const f=c("div",["form__group","u-margin-button-medium"]);for(let t in o){const e=c("div",["form__radio-group"]),n=s("input",[["type","radio"],["id",o[t]],["value",o[t]],["name","units"],["class","form__radio-input"]]),r=m(["form__radio-label"],o[t],o[t]),i=c("span",["form__radio-button"]);r.appendChild(i),p(e,[n,r]),f.appendChild(e),n.addEventListener("change",(()=>{n.value===o.weight&&n.checked?(y.setAttribute("step","0.1"),y.setAttribute("min","0.1")):y.hasAttribute("step")&&(y.removeAttribute("step"),y.setAttribute("min","1"))}))}const g=m(["form__label"],"product-quantity","Product quantity"),y=s("input",[["name","product-quantity"],["type","number"],["placeholder","0"],["class","form__input"],["min","1"]]);y.required=!0;let v=c("div",["form__group"]);p(v,[g,y]);const _=d(["btn","btn__add"],"add-category","+ Add new product");_.setAttribute("type","submit");const L=b(e);let E=c("div",["btn__group"]);return p(E,[_,L]),{form:e,nameInput:r,categorySelector:u,quantityInput:y,nameGroup:i,categoryGroup:l,radioContainer:f,quantityGroup:v,addButton:_,buttonGroup:E}}function L(t,e){const n=v();n.nameInput.value=e.name,n.addButton.textContent="Edit category",n.form.addEventListener("submit",(function o(r){r.preventDefault();const i=n.nameInput.value;e.changeName(i),q(t),y(n.form),n.form.removeEventListener("submit",o)})),p(n.form,[n.nameGroup,n.buttonGroup])}function E(t,e,n){const r=_(t.categoryList);r.addButton.textContent="Edit product";const i=r.radioContainer.querySelectorAll('input[name="units"]');let a=n.units;i.forEach((t=>{t.value===n.units&&(t.checked=!0,t.value===o.weight&&(r.quantityInput.setAttribute("step","0.1"),r.quantityInput.setAttribute("min","0.1"))),t.addEventListener("change",(()=>{t.value===o.weight&&t.checked,a=t.value}))})),r.nameInput.value=n.name,r.quantityInput.value=n.quantity,r.categorySelector.value=e.name,r.form.addEventListener("submit",(function o(i){i.preventDefault();const u=r.nameInput.value,c=r.quantityInput.value,s=r.categorySelector.value,d=parseFloat(c);if(s===e.name)n.editQuantity(d),n.editName(u),n.editUnits(a);else{let o=t.categoryList.filter((t=>t.name===s))[0];e.deleteProduct(n),t.addProduct(u,d,a,o)}q(t),y(r.form),r.form.removeEventListener("submit",o)})),p(r.form,[r.nameGroup,r.categoryGroup,r.radioContainer,r.quantityGroup,r.buttonGroup])}function C(t,e){return localStorage.getItem(t)!==JSON.stringify(e)&&(localStorage.setItem(t,JSON.stringify(e)),!0)}function q(t){const e=document.querySelector(".shopping-list");e.innerHTML="";for(let n of t.categoryList){let o=c("div",["shopping-list__category"]),i=c("div",["shopping-list__category-name"]);const a=document.createElement("h4");a.textContent=n.name;const[u,d,l]=f();d.addEventListener("click",(()=>{L(t,n)})),l.addEventListener("click",(()=>{t.deleteCategory(n),q(t)})),p(i,[a,u]),o.appendChild(i),n.productList.forEach((e=>{let i=c("div",["shopping-list__element"]),a=c("div",["u-flex-left"]),u=c("div",["u-flex-right","shopping-list__element-details"]),d=s("input",[["type","checkbox"],["id",e.name]]);d.classList.add("shopping-list__checkbox-input"),d.checked=e.bought,d.addEventListener("change",(()=>{e.editBought(),console.log("bought"),C(r,t)}));let l=m(["shopping-list__checkbox-label"],e.name,e.name),g=c("span",["shopping-list__checkbox-mark"]),y=c("i",["fas","fa-check"]);g.appendChild(y),l.appendChild(g);let h=document.createElement("span");h.textContent=`${e.quantity}  ${e.units}`;const[b,v,_]=f();v.addEventListener("click",(()=>{E(t,n,e)})),_.addEventListener("click",(()=>{t.deleteProduct(e,n),q(t)})),p(a,[d,l]),p(u,[h,b]),p(i,[a,u]),o.appendChild(i)})),e.appendChild(o)}let n=c("div",["shopping-list__total"]),o=document.createElement("p");o.textContent=`Total: ${t.total}`,n.appendChild(o),e.appendChild(n),C(r,t)}let S;S=localStorage.getItem("myShopping")?function(t){const e=JSON.parse(localStorage.getItem("myShopping"));Object.setPrototypeOf(e,u.prototype);for(let t of e.categoryList){Object.setPrototypeOf(t,a.prototype);for(let e of t.productList)Object.setPrototypeOf(e,i.prototype)}return e}():new u(["warzywa","owoce","nabiał","mięso i ryby","artykuły higieniczne","pieczywo","produkty suche"]);const x=document.getElementById("adding-buttons-product"),k=document.getElementById("adding-buttons-category");x.addEventListener("click",(()=>{!function(t){const e=_(t.categoryList),n=e.radioContainer.querySelectorAll('input[name="units"]');let r=null;n.forEach((t=>{t.addEventListener("change",(()=>{t.value===o.weight&&t.checked,r=t.value}))})),e.form.addEventListener("submit",(function n(o){o.preventDefault();const i=e.nameInput.value,a=e.quantityInput.value,u=e.categorySelector.value,c=t.categoryList.filter((t=>t.name===u))[0],s=parseFloat(a);t.addProduct(i,s,r,c),q(t),y(e.form),e.form.removeEventListener("submit",n)})),p(e.form,[e.nameGroup,e.categoryGroup,e.radioContainer,e.quantityGroup,e.buttonGroup])}(S)})),k.addEventListener("click",(()=>{!function(t){const e=v();e.form.addEventListener("submit",(function n(o){o.preventDefault();const r=e.nameInput.value;t.addCategory(r),q(t),y(e.form),e.form.removeEventListener("submit",n)})),p(e.form,[e.nameGroup,e.buttonGroup])}(S)})),q(S)}},e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={exports:{}};return t[o](r,r.exports,n),r.exports}return n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(231)})()}));