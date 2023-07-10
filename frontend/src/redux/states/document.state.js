import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    content: `<div style="background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-fairy-tale-field-background-design-backgroundillustration-backgroundfairy-tale-image_64088.jpg);
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    height: 700px;
                    margin-bottom: 50px;">
                <p>Este es un documento de prueba</p>
               </div>
               <div style="background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-fairy-tale-field-background-design-backgroundillustration-backgroundfairy-tale-image_64088.jpg);
                    background-size: cover;
                    background-position: center;
                    width: 100%;
                    height: 700px;">
                <p>Este es un documento de prueba</p>
               </div>
               `,
  },
  reducers: {
    saveDocument: (state, action) => {
      state.content = action.payload;
      localStorage.setItem("document", action.payload);
    },

    loadDocument: (state) => {
      state.content = localStorage.getItem("document");
    },

    nuevoDocument: (state) => {
      state.content = "";
    },
  },
});

export const { saveDocument, loadDocument, nuevoDocument } =
  documentSlice.actions;

export default documentSlice.reducer;
