class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable (available) {
        this.available = available;
    }
}

class GoodsList {
    #goods;

    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        let result = []
        for (let i=0; i<this.#goods.length; i++) {
            if (this.#goods[i].available === 'Да') {
                if (filter.test(this.#goods[i]['name']) === true) {
                    result[result.length] = this.#goods[i];
                }
            } 
        }
        if (this.sortPrice === true) {
            if (this.sortDir === true) {
                result.sort(( a, b ) => {
                    return b.price - a.price;
                });
            } else {
                result.sort(( a, b ) => {
                    return a.price - b.price;
                });
            }
        }
        return result
    }

    add (good) {
        for (let i=0; i<this.#goods.length; i++) {
            if (good.name === this.#goods[i].name) {
                return console.log('Товар уже есть в каталоге (дубль)')
            }
        }
        this.#goods[this.#goods.length] = good;
        return console.log('Товар добавлен в каталог')
    }

    remove(id) {
        for (let i=0; i<this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                var id_to_del = id
                
            }
        this.#goods.splice(this.#goods.id_to_del, 1)
        }
        return console.log('Товар удален из каталога')
    }
}

class BasketGood extends Good {
    constructor (good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor (goods) {
        this.goods = goods
    }

    get totalAmount() {
        var amount = 0;
        this.goods.forEach((value, index) => {
            amount += +value.price * +value.amount;
        })
        return amount
    }

    get totalSum() {

        return this.goods.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)
    }

    add(good, amount) {

        let f = true;
        for (let i=0; i<this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                f = false;
                this.goods[i].amount += amount;
            } 
        }
        if (f === true) {
            this.goods[this.goods.length] = new BasketGood(good, amount)
        }

    }

    remove(good, amount) {

        for (let i=0; i<this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                if (this.goods[i].amount <= amount) {
                    this.goods.splice(i, 1)
                } else {
                    this.goods[i].amount -= amount
                }
            }
        }
    }

    clear() {
        this.goods.length=0;
    }

    removeUnavailable() {
        function checkavailable(good) {
            if (good.available === 'Да') {
                return good
            }
        }
        this.goods = this.goods.filter(checkavailable)
    }
}

good1 = new Good('1', 
    'Туфли мужские сезон "Лето"', 
    'Элитные мужские туфли для лета',
    [40, 41, 42, 43, 44, 45, 46],
    99900,
    'Да'
);

good2 = new Good(
    '2',
    'Туфли мужские сезон "Зима"',
    'Теплые мужские туфли для зимы',
    [40, 41, 42, 43, 44, 45, 46],
    32500,
    'Нет'
);

good3 = new Good(
    '3',
    'Туфли женские сезон "Лето"',
    'Стильные женские туфли для лета',
    [36, 37, 38, 39],
    43500,
    'Да'
);

good4 = new Good(
    '4',
    'Туфли женские сезон "Зима"',
    'Стильные женские туфли для зимы',
    [36, 37, 38, 39],
    50000,
    'Да'
);

good5 = new Good(
    '5',
    'Детские туфли для девочки сезон "Лето"',
    'Стильные детские туфли для лета',
    [31, 32, 33, 34],
    17500,
    'Да'
);



good1.setAvailable('Нет')
goodslist = new GoodsList([good1, good3, good4, good5], filter=/Лето/i, sortPrice=true, sortDir=true)
console.log('goodlist.list =', goodslist.list)
goodslist.add(good2)
goodslist.add(good3)
goodslist.add(good4)
goodslist.remove('5')
goodslist.filter=/Лето/i;
goodslist.sortPrice=true;
goodslist.sortDir=true;
console.log('goodlist.list =', goodslist.list)
basketgood3 = new BasketGood(good3, 2)
basketgood4 = new BasketGood(good4, 3)
basketgood1 = new BasketGood(good1, 1)
basket = new Basket([basketgood1, basketgood3, basketgood4])
basket.removeUnavailable()
basket.remove(good3, 1)
basket.remove(good3, 1)
basket.clear()
basket.add(good3, 1)
basket.add(good3, 2)

console.log('basket.totalAmount =', basket.totalAmount)
console.log('basket.totalSum =', basket.totalSum)