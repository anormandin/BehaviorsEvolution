import $ from 'jquery';

class Options {
  constructor() {
    $('.option-control input').bind(
      'input',
      function(evt) {
        this[evt.target.id] = evt.target.value;
        $(`[for='${evt.target.id}']`).html(evt.target.value);
        console.log(this);
      }.bind(this)
    );
  }
}

const options = new Options();
export default options;
