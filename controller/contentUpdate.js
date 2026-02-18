import Content from "../model/contentModel.js";

 export const updateContent = async(req,res)=>{

    try {
        const updates = req.body;

        for (const key in updates){
         await Content.findOneAndUpdate({key},{value:updates[key]},{upsert:true})
        }
          res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
          res.status(500).json({ message: error.message });
    }

}

export const getContent = async(req,res)=>{
      try {
            const content = await Content.find();
            res.status(200).json(content);
      } catch (error) {
            res.status(500).json({message : error.message});
      }
}