import axios from 'axios';

axios.get('http://www.ltconline.ca/webwatch/MobileAda.aspx?r=11&d=4')
  .then((data) => {
    console.log(data);
  });