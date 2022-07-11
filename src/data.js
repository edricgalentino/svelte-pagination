import Chance from "chance";

const chance = new Chance();

const data = [];
const moods = [
    0x1f60d, // 😍
    0x1f60a, // 😊
    0x1f603, // 😃
    0x1f60f, // 😏
    0x1f620, // 😠
    0x1f632, // 😲
    0x1f615, // 😕
    0x1f622, // 😢
];

for (let i = 0; i < 150; i++) {
    const random = Math.floor(Math.random() * moods.length);

    data.push({
        id: i + 1,
        name: chance.first(),
        surname: chance.last(),
        email: chance.email({ domain: "example.com" }),
        mood: String.fromCodePoint(moods[random]),
    });
}

const total = data.length;

export default (path, params = {}) => {
    const per_page = params.per_page || 15;
    const last_page = Math.ceil(total / per_page);
    const page = params.page || 1;
    const from = (page - 1) * per_page;
    const to = page * per_page;

    const slice = data.slice(from, to);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                total: total,
                per_page: per_page,
                current_page: page,
                last_page: last_page,
                first_page_url: "http://laravel.app?page=1",
                last_page_url: "http://laravel.app?page=" + last_page,
                next_page_url: "http://laravel.app?page=" + (page + 1),
                prev_page_url: "http://laravel.app?page=" + (page - 1),
                path: "http://laravel.app",
                from: from,
                to: to,
                data: slice,
            });
        }, 200);
    });
};
