import express from 'express'
import axios from 'axios'
import Products  from '../schema/Products.js' 



const firstRouter = express.Router()


firstRouter.get('/',async(req,res)=>{

    try{
    const allproducts=await Products.find().maxTimeMS(3000)
    res.status(201).json({length:allproducts.length,msg:'foundedproducts',allproducts})
    }
    catch (error){
        res.status(404).json({error:'no products founded',errormsg:error.message})
    }

})
firstRouter.post('/',async (req,res)=>{
 const query ='hoodie'
 
    const options = {
        
        params: {
           q:'knitwear',
          limit: '48',
          sort: 'freshness',
          currency: 'USD',
          sizeSchema: 'US',

 
          lang: 'en-US'


        },
      headers: {
          'X-RapidAPI-Key': '223ab8f803msh1d866d091b34514p1f0364jsn9fa757ce4a5d',
          'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
      };


      const url= 'https://asos2.p.rapidapi.com/products/v2/list'
      try{
        const response = await  axios.get(url,options)
        const newproducts=  response.data.products
        for (const productData of newproducts) {
            const existingProduct = await Products.findOne({ id: productData.id });
    if (existingProduct) {
     
      await Products.updateOne({ id: productData.id }, productData);
    } else {
       
      await Products.create(productData);

    }

                        
          }
    res.status(201).json({msg:'create a product successfully'})
      } catch (error){
        console.log('cannot create the product')
        res.status(404).json({error:'cannot create the product',errormsg:error.message})
      }

})

 
firstRouter.get('/:id',async(req,res)=>{
    const {id} = req.params
       try{
        
        const product = await Products.findById(id)
 
      res.status(201).json({msg:'found the product successfully',product})
          }
     catch (error){
      res.status(404).json({error:'not found results',mes:error.message})
     }

  
  })
  
export default firstRouter