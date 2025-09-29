import React, { createContext } from "react";
import { type CartContextType } from "../types";

// Context
export const CartContext = createContext<CartContextType>(null);
