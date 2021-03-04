import Cat from '../models/Cat';
import axios from 'axios';

const databaseCreation = () => {
  axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/categories'
  }).then(res => {
      for (let index = 0; index < res.data.length; index++) {
          let { id } = res.data[index];
          getData(id, 100); //OBTAIN 100 elements from each category
      }
  }).catch(err => console.log(err));
};

const getData = (id: number, limit:number) => {
  axios({
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/images/search',
      params: {
          limit,
          category_ids: id
      }
  }).then((response) => {

      for (let index = 0; index < response.data.length; index++) {
          let { categories, url: img_url, width, height } = response.data[0];
          let { id: category_id, name: id_name } = categories[0];
          insertDocument(category_id, id_name, width, height, img_url);
          console.log(category_id, id_name, width, height, img_url, 'INSERTED');
      }
  }).catch(err => console.log(err));
};

const insertDocument = (category_id: number, id_name:string, width: number, height: number, img_url: string) => {
  let newCat = new Cat({
      category_id,
      id_name,
      width,
      height,
      img_url
  });
  
  newCat.save((err, newUserDB)=>{
      if(err) console.log(err)
      console.log(newUserDB);
  });
};

export default databaseCreation;