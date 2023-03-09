import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SelectorCountOfProduct from "./SelectorCountOfProduct";


describe('SayHello component specs', () => {

      let container = null;
      beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
      });

      afterEach(() => {
          unmountComponentAtNode(container);
          container.remove();
          container = null;
      });


      it('called with right args in increment button', () => {  
        const product = {
            id: '#6',
            count: 1
          }

        const callback = jest.fn()
        render(<SelectorCountOfProduct product = {product} 
                                       changeCountByOne={callback} >
               </SelectorCountOfProduct>, container)
        const button = document.querySelector('.incriment-button')

        act(() => {
          button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
        })
        expect(callback).toBeCalledWith('#6',1,true)
      });


      it('called with right args in decrement button', () => {  
        const product = {
            id: '#6',
            count: 1
          }

        const callback = jest.fn()
        render(<SelectorCountOfProduct product = {product} 
                                       changeCountByOne={callback} >
               </SelectorCountOfProduct>, container)
        const button = document.querySelector('.decriment-button')

        act(() => {
          button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
        })
        expect(callback).toBeCalledWith('#6',1,false)
      });


      it('value in typography is count of product', () => {  
        const product = {
            count: 1
          }
        render(<SelectorCountOfProduct product = {product} 
                                       changeCountByOne={()=> product.count++} >
               </SelectorCountOfProduct>, container)
        const text = document.querySelector('.count-product')

        expect(text.innerHTML).toBe(product.count+'')
      });

    // 1. имеет свойство value
    // 2. имеет callback на инкремент
    // 3. имеет callback на декремент
})