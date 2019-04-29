import 'p5/lib/addons/p5.dom';

export default class OptionControl {
  render(container, { id, label, min, max, cur }) {
    let div = createDiv();
    div.parent(options);

    let lbl = createSpan(label);
    lbl.parent(div);

    let slider = createSlider(min, max, cur, 1);
    slider.parent(div);

    let lblVal = createSpan(cur);
    lblVal.parent(div);
  }
}

{
  /* <div class="row option-control">
            <div class="col-sm-4">
              <small>Max speed</small>
            </div>
            <div class="col-sm-6">
              <input type="range" id="maxSpeed" min="1" max="12" step="0.5" />
            </div>
            <div class="col-sm-2">
              <small for="maxSpeed" class="text-muted">
                12
              </small>
            </div>
          </div> */
}
