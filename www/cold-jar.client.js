import * as html2canvas from 'html2canvas';

html2canvas(document.body)
    .then((data) => {
        let parsed = data.toDataURL("image/png", 0.5);

        //Data to be sent to the backend
        console.log(parsed);
    })
    .catch((error) => console.log(error));