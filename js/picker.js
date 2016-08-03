$("#picker").picker({
    toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">确定</button>\
              <h1 class="title">请选择省</h1>\
              </header>',
    cols: [
        {
            textAlign: 'center',
            values: ['北京', '吉林', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
        }
    ]
});