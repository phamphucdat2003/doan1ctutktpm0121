const path = require('path');
const express = require('express');
const port = 3000;
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const session = require('express-session');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes/index');
const db = require('./config/db');
//connect to db
db.connect();
//img
app.use(express.static(path.join(__dirname, 'public')));
//post req.body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//express-session
app.use(session({
    secret: 'datannguyen',
    resave: false,
    saveUninitialized: false,
    }));



app.use(morgan('combined'));
//handlebars
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            admin: (user) => user !== 'admin123',
            sum: (a, b) => a + b,
            sub: (a, b) => a - b,
            sortable: (field, sort) => {
                const types = {
                    default: 'M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z',
                    asc: 'M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32z',
                    desc: 'M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z',
                };
                return `
                <a href="?_sort&column=${field}&type=${
                    sort.type === 'asc' ? 'desc' : 'asc'
                }">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 576 512">
                <path d="${
                    field === sort.column ? types[sort.type] : types.default
                }"/>
                </svg>
                </a>`;
            },
            sortabledaytime: (field, sort) => {
                const types = {
                    default: 'M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z',
                    asc: 'M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z',
                    desc: 'M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32z',
                };
                return `
                <a href="?_sort&column=${field}&type=${
                    sort.type === 'asc' ? 'desc' : 'asc'
                }">
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 576 512">
                <path d="${
                    field === sort.column ? types[sort.type] : types.default
                }"/>
                </svg>
                </a>`;
            },
            formatdaytime: (time) => {
                var dateTime = new Date(time);
                // Lấy ngày
                var date = dateTime.getDate().toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                });
                // Lấy tháng (lưu ý: trong JavaScript, tháng được đếm từ 0 đến 11)
                var month = (dateTime.getMonth() + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                });
                // Lấy năm
                var year = dateTime.getFullYear();
                // Lấy giờ
                var hours = dateTime.getHours().toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                });
                // Lấy phút
                var minutes = dateTime.getMinutes().toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                });
                return `<h3>${date}/${month}/${year}-${hours}:${minutes}</h3>`;
            }
        },
    }),
);

app.use(methodOverride('_method'));

//custom middlewares
app.use(SortMiddleware);

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

//port 3000
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
