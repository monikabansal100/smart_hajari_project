let validations=(req)=>{
    try{
    let {schoolName, schoolEmail, schoolContact, name, contact, email, address, regNo, state, district, planMasterId, studentCount, isActive,isUpdate,password,contactPersonName,role,expDate} = req.body;
    if(!schoolName){
        throw new Error('School Name is required')
    }
    if(!schoolEmail){
        throw new Error('School Email is required')
    }
    if(!schoolContact){
        throw new Error('School Contact is required')
    }
    if(!name){
        throw new Error('Name is required')
    }
    if(!contact){
        throw new Error('Contact is required')
    }
    if(!email){
        throw new Error('Email is required')
    }
    if(!address){
        throw new Error('Address is required')
    }
    if(!regNo){
        throw new Error('Reg No is required')
    }
    if(!state){
        throw new Error('State is required')
    }
    if(!district){
        throw new Error('District is required')
    }
    if(!planMasterId){
        throw new Error('Plan Master Id is required')
    }
    if(!studentCount){
        throw new Error('Student Count is required')
    }
    if(!isActive){
        throw new Error('Is Active is required')
    }
    if(!isUpdate){
        throw new Error('Is Update is required')
    }
    if(!password){
        throw new Error('Password is required')
    }
    if(!contactPersonName){
        throw new Error('Contact Person Name is required')
    }
    if(!role){
        throw new Error('Role is required')
    }
    if(!expDate){
        throw new Error('Exp Date is required')
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9.-]+)*(com|org|net|...|xyz)$/
    if(!phoneRegex.test(schoolContact)){
        throw new Error('Invalid School Contact')
    }
    if(!emailRegex.test(schoolEmail)){
        throw new Error('Invalid School Email')
    }
    if(!emailRegex.test(email)){
        throw new Error('Invalid  email')
    }
    if(!phoneRegex.test(contact)){
        throw new Error('Invalid Contact')
    }
    }catch(err){
        console.log(err)
        return err.message
    }

}

module.exports=validations;