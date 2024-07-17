const usecases = ["signup","password_change","login"]

const validUsecase = (usecase)=>{
    if(usecases.includes(usecase)){
        return true;
    }
    return false;
}

module.exports = validUsecase;