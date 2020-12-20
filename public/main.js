!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}(self,(function(){return(()=>{"use strict";var t={183:(t,e,n)=>{n.r(e);const o={weight:"kg",pcs:"pcs."};class r{constructor(t,e,n){this.name=t,this.quantity=e,this.units=n,this.bought=!1}editQuantity(t){this.quantity=t}editName(t){this.name=t}editUnits(t){this.units=t}editBought(){this.bought=!this.bought}}class i{constructor(t){this.name=t,this.productList=[]}changeName(t){this.name=t}addProduct(t){this.productList.push(t)}deleteProduct(t){const e=this.productList.filter((e=>e!==t));this.productList=e}}function a(t,e){const n=document.createElement(t);for(let t in e)n.classList.add(e[t]);return n}function u(t,e){const n=document.createElement(t);for(let t in e)n.setAttribute(e[t][0],e[t][1]);return n}function c(t,e,n){const o=a("button",t);return o.setAttribute("id",e),o.textContent=n,o}function s(t,e){const n=a("button",t),o=a("i",e);return n.appendChild(o),n}function d(t,e){for(let n in e)t.appendChild(e[n]);return t}function l(t,e,n){const o=a("label",t);return o.setAttribute("for",e),o.textContent=n,o}function p(){let t=a("div",["btn__group"]),e=s(["btn","btn__boardless","btn__edit"],["far","fa-edit"]),n=s(["btn","btn__boardless","btn__delete"],["far","fa-trash-alt"]);return d(t,[e,n]),[t,e,n]}function m(){document.querySelector("#overlay").classList.toggle("active")}function f(t){m(),t.innerHTML="",t.classList.toggle("inactive")}function g(){m();const t=document.querySelector("#form");return t.classList.toggle("inactive"),t}function h(t){const e=c(["btn","btn__cancel"],"cancel","Cancel");return e.addEventListener("click",(()=>{f(t)})),e}function y(){const t=g(),e=l(["form__label"],"category-name","Category name"),n=u("input",[["name","category-name"],["placeholder","Enter category name"],["class","form__input"]]);n.required=!0;let o=a("div",["form__group"]);d(o,[e,n]);const r=c(["btn","btn__add"],"add-category","+ Add new category");r.setAttribute("type","submit");const i=h(t);let s=a("div",["btn__group"]);return d(s,[r,i]),{form:t,nameInput:n,addButton:r,buttonGroup:s,nameGroup:o}}function b(t){const e=g(),n=l(["form__label"],"category","Product name"),r=u("input",[["name","product-name"],["placeholder","Enter product name"],["class","form__input"]]);r.required=!0;let i=a("div",["form__group"]);d(i,[n,r]);const s=l(["form__label"],"category","Choose category");let p=function(t){const e=u("select",[["name","category"]]);e.classList.add("form__select");for(let n of t){let t=document.createElement("option");t.textContent=n.name,e.appendChild(t)}return e}(t),m=a("div",["form__group"]);d(m,[s,p]);const f=a("div",["form__group","u-margin-button-medium"]);for(let t in o){const e=a("div",["form__radio-group"]),n=u("input",[["type","radio"],["id",o[t]],["value",o[t]],["name","units"],["class","form__radio-input"]]),r=l(["form__radio-label"],o[t],o[t]),i=a("span",["form__radio-button"]);r.appendChild(i),d(e,[n,r]),f.appendChild(e),n.addEventListener("change",(()=>{n.value===o.weight&&n.checked?(b.setAttribute("step","0.1"),b.setAttribute("min","0.1")):b.hasAttribute("step")&&(b.removeAttribute("step"),b.setAttribute("min","1"))}))}const y=l(["form__label"],"product-quantity","Product quantity"),b=u("input",[["name","product-quantity"],["type","number"],["placeholder","0"],["class","form__input"],["min","1"]]);b.required=!0;let _=a("div",["form__group"]);d(_,[y,b]);const v=c(["btn","btn__add"],"add-category","+ Add new product");v.setAttribute("type","submit");const L=h(e);let E=a("div",["btn__group"]);return d(E,[v,L]),{form:e,nameInput:r,categorySelector:p,quantityInput:b,nameGroup:i,categoryGroup:m,radioContainer:f,quantityGroup:_,addButton:v,buttonGroup:E}}function _(t,e){const n=y();n.nameInput.value=e.name,n.addButton.textContent="Edit category",n.addButton.addEventListener("click",(()=>{const o=n.nameInput.value;""===o?alert("Enter a category name"):(e.changeName(o),L(t),f(n.form))})),d(n.form,[n.nameGroup,n.buttonGroup])}function v(t,e,n){const r=b(t.categoryList);r.addButton.textContent="Edit product";const i=r.radioContainer.querySelectorAll('input[name="units"]');let a=n.units;i.forEach((t=>{t.value===n.units&&(t.checked=!0,t.value===o.weight&&(r.quantityInput.setAttribute("step","0.1"),r.quantityInput.setAttribute("min","0.1"))),t.addEventListener("change",(()=>{t.value===o.weight&&t.checked,a=t.value}))})),r.nameInput.value=n.name,r.quantityInput.value=n.quantity,r.categorySelector.value=e.name,r.form.addEventListener("submit",(function o(i){i.preventDefault();const u=r.nameInput.value,c=r.quantityInput.value,s=r.categorySelector.value,d=parseFloat(c);if(s===e.name)n.editQuantity(d),n.editName(u),n.editUnits(a);else{let o=t.categoryList.filter((t=>t.name===s))[0];e.deleteProduct(n),t.addProduct(u,d,a,o)}L(t),f(r.form),r.form.removeEventListener("submit",o)})),d(r.form,[r.nameGroup,r.categoryGroup,r.radioContainer,r.quantityGroup,r.buttonGroup])}function L(t){const e=document.querySelector(".shopping-list");e.innerHTML="";for(let n of t.categoryList){let o=a("div",["shopping-list__category"]),r=a("div",["shopping-list__category-name"]);const i=document.createElement("h4");i.textContent=n.name;const[c,s,m]=p();s.addEventListener("click",(()=>{_(t,n)})),m.addEventListener("click",(()=>{t.deleteCategory(n),L(t)})),d(r,[i,c]),o.appendChild(r),n.productList.forEach((e=>{let r=a("div",["shopping-list__element"]),i=a("div",["u-flex-left"]),c=a("div",["u-flex-right","shopping-list__element-details"]),s=u("input",[["type","checkbox"],["id",e.name]]);s.classList.add("shopping-list__checkbox-input"),s.checked=e.bought,s.addEventListener("change",(()=>{e.editBought()}));let m=l(["shopping-list__checkbox-label"],e.name,e.name),f=a("span",["shopping-list__checkbox-mark"]),g=a("i",["fas","fa-check"]);f.appendChild(g),m.appendChild(f);let h=document.createElement("span");h.textContent=`${e.quantity}  ${e.units}`;const[y,b,_]=p();b.addEventListener("click",(()=>{v(t,n,e)})),_.addEventListener("click",(()=>{t.deleteProduct(e,n),L(t)})),d(i,[s,m]),d(c,[h,y]),d(r,[i,c]),o.appendChild(r)})),e.appendChild(o)}let n=a("div",["shopping-list__total"]),o=document.createElement("p");o.textContent=`Total: ${t.total}`,n.appendChild(o),e.appendChild(n)}const E=new class{constructor(t){this.categoryList=[],this.total=0,t.forEach((t=>{const e=new i(t);this.categoryList.push(e)}))}addProduct(t,e,n,o){const i=new r(t,e,n);o.addProduct(i),this.sumTotal()}deleteProduct(t,e){e.deleteProduct(t),this.sumTotal()}addCategory(t){const e=new i(t);this.categoryList.push(e)}deleteCategory(t){const e=this.categoryList.filter((e=>e!==t));this.categoryList=e,this.sumTotal()}sumTotal(){let t=0;for(let e of this.categoryList)t+=e.productList.reduce(((t,e)=>e.units===o.weight?t+1:t+e.quantity),0);this.total=t}}(["warzywa","owoce","nabiał","mięso i ryby","artykuły higieniczne","pieczywo","produkty suche"]),C=document.getElementById("adding-buttons-product"),q=document.getElementById("adding-buttons-category");C.addEventListener("click",(()=>{!function(t){const e=b(t.categoryList),n=e.radioContainer.querySelectorAll('input[name="units"]');let r=null;n.forEach((t=>{t.addEventListener("change",(()=>{t.value===o.weight&&t.checked,r=t.value}))})),e.form.addEventListener("submit",(function n(o){o.preventDefault();const i=e.nameInput.value,a=e.quantityInput.value,u=e.categorySelector.value,c=t.categoryList.filter((t=>t.name===u))[0],s=parseFloat(a);t.addProduct(i,s,r,c),L(t),f(e.form),e.form.removeEventListener("submit",n)})),d(e.form,[e.nameGroup,e.categoryGroup,e.radioContainer,e.quantityGroup,e.buttonGroup])}(E)})),q.addEventListener("click",(()=>{!function(t){const e=y();e.form.addEventListener("submit",(function n(o){o.preventDefault();const r=e.nameInput.value;t.addCategory(r),L(t),f(e.form),e.form.removeEventListener("submit",n)})),d(e.form,[e.nameGroup,e.buttonGroup])}(E)})),L(E)}},e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={exports:{}};return t[o](r,r.exports,n),r.exports}return n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(183)})()}));