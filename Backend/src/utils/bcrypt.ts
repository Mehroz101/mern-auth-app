import bcrypt from 'bcrypt';
export const hashvalue = async (value :string, saltRounds?: number) => 
    await bcrypt.hash(value,saltRounds || 10);


export const comparePassword  = async (password:string, hashValue:string)=>
    await bcrypt.compare(password,hashValue).catch((err) => {
        console.log(err);
        return false;
    });