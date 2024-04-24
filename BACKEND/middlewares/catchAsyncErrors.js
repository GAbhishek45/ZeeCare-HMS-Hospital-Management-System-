export const catchAsyncErrors = (theFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(req,res,next).catch(next);
    }
}