import { onSetActiveProduct } from "../store/Shop/shopSlice"; 
import { useDispatch } from "react-redux"

export const useShopStore = () => {

    const dispatch = useDispatch();

    const setActiveProduct = (product) => {
        dispatch(onSetActiveProduct(product))
    }

  return {
    setActiveProduct
  }
}
