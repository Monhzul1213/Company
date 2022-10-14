export const checkMimeType = file => {
    let err = ''
    const types = ['image/png', 'image/jpeg', 'image/gif']
    if(types.every(type => file.type !== type)){
      console.log(file.type);
      err += file.type + ' формат буруу байна.';
    }
  
    if(err !== '') return err; 
    else return checkFileSize(file);
    return false;
  }
  
  export const checkFileSize = file => {
    let size = 1000000;
    let err = ''; 
    if(file.size > size){
      err += 'Файлын хэмжээ хэт том байна.';
    }
    
    if(err !== '') return err;
    return false
  }
  
  export const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }
  
  export const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };
  
  const rand = () => {
    return Math.random().toString(36).substr(2);
  };
  
  export const randomtoken = () => {
    return rand() + rand();
  };