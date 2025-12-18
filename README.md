# Project "Drones online store" | Проєкт "Онлайн магазин дронів"

## Навігація
- [Project "Drones online store" | Проєкт "Онлайн магазин дронів"](#project-drones-online-store--проєкт-онлайн-магазин-дронів)
  - [Навігація](#навігація)
  - [Мета створення проєкту | Purpose of the Project](#мета-створення-проєкту--purpose-of-the-project)
  - [Склад команди | Team members | Developers](#склад-команди--team-members--developers)
  - [Стиль написання коду | Style of code writing](#стиль-написання-коду--style-of-code-writing)
  - [Використані технології | Tehnologies used](#використані-технології--tehnologies-used)
  - [Архітектура проєкту | Project architecture](#архітектура-проєкту--project-architecture)
  - [Використані статус-коди | Used status-codes](#використані-статус-коди--used-status-codes)

## Мета створення проєкту | Purpose of the Project

Ми обрали саме цей проєкт, бо він ідеально підходить для практики з React, TypeScript, які ми нещодавно вивчили.

## Склад команди | Team members | Developers

- [Ващенко Артем](https://github.com/VashchenkoArtem)  |  [Vashchenko Artem - Teamlead](https://github.com/VashchenkoArtem)
- [Коцаба Анастасія](https://github.com/AnastasiiaKotsaba)  |  [Kotsaba Anastasiia](https://github.com/AnastasiiaKotsaba)
- [Харлан Кирило](https://github.com/KirillKharlan)  |  [Kharlan Kyrylo](https://github.com/KirillKharlan)

## Стиль написання коду | Style of code writing

- В нашому проєкті ми використовуємо слоїсту архітектуру. Слоїста архітектура - підхід, завдяки якому увесь код ділиться на декілька логічних блоків. Наприклад: post.service.ts, tag.controller.ts |
- In our project we use layered architecture. Layered architecture is an approach where all the code is divided into several logical blocks. For example: post.service.ts, tag.controller.ts

## Використані технології | Tehnologies used
  - *TypeScript* - це JavaScript з додаванням статичної типізації. Він дозволяє знаходити помилки на етапі розробки, роблячи великі проєкти надійнішими.
  - *Node.js* - це безплатне, кросплатформне середовище виконання JavaScript із відкритим кодом, яке дозволяє розробникам створювати сервери, вебзастосунки, інструменти командного рядка та скрипти.
  - *Express.js* - це програмний каркас розробки серверної частини вебзастосунків для Node. js, реалізований як вільне і відкрите програмне забезпечення під ліцензією MIT. Він спроєктований для створення вебзастосунків і API. 
  - *React* - це відкрита JavaScript бібліотека для створення інтерфейсів користувача, яка покликана вирішувати проблеми часткового оновлення вмісту вебсторінки, з якими стикаються в розробці односторінкових застосунків.
  - *HTML* - це мова гіпертекстової розмітки. Вона необхідна для створення елементів сайту: посилань і сторінок.
  - *CSS* - це спеціальна мова стилю сторінок, що використовується для опису їхнього зовнішнього вигляду.
  - *Middleware* - це шар програмного забезпечення, що складається з агентів, які є посередниками між різними компонентами великого застосунка.


## Архітектура проєкту | Project architecture
  - *src* - Створення та налаштування додатків | Creating application and settings 
    <details>
      <summary><strong>Main</strong></summary>
    </details>
    <details>
      <summary><strong>Catalog</strong></summary>
    </details>
    <details>
      <summary><strong>Order</strong></summary>
    </details>
    <details>
      <summary><strong>Contacts</strong></summary>
    </details>
    <details>
      <summary><strong>About us</strong></summary>
    </details>
    <details>
      <summary><strong>Products</strong></summary>
      <ul>
        <li>products.types.ts</li>
        <li>products.router.ts</li>
        <li>products.controller.ts</li>
        <li>products.service.ts</li>
        <li>products.repository.ts</li>
      </ul>
    </details>
    <details>
      <summary><strong>Categories</strong></summary>
      <ul>
        <li>categories.types.ts</li>
        <li>categories.router.ts</li>
        <li>categories.controller.ts</li>
        <li>categories.service.ts</li>
        <li>categories.repository.ts</li>
      </ul>
    </details>
    <details>
      <summary><strong>User</strong></summary>
      <ul>
        <li>user.types.ts</li>
        <li>user.router.ts</li>
        <li>user.controller.ts</li>
        <li>user.service.ts</li>
        <li>user.repository.ts</li>
      </ul>
    </details>

  - *prisma* - Робота з БД | Work with data base
  - *.gitignore*- Файли, які не додаються в commit | Files that are not attached to commit
  - *package-lock.json* і *package.json* - Налаштування проєкту | Project settings


## Використані статус-коди | Used status-codes

## Products


### Усі товари | All products

```
GET /products
```
  | **Status-code \| Статус-код** | **Description \| Опис** |
  | --- | --- |
  | 200 | Success \| Успіх |
  | 204 | Without information \| Немає інформації |
<details>
<summary>Відповідь | Response</summary>

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 45999,
    "discount": 50,
    "image": "iphone-15-pro.png",
    "description": "Iphone 15",
    "count": 35,
    "categoryId": 1,
    "blocks": [
      {
        "id": 1,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "left",
        "image": "design.png",
        "blockOrder": 1,
        "productId": 1
      },
      {
        "id": 2,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "center",
        "image": "design.png",
        "blockOrder": 2,
        "productId": 1
    },
    {
        "id": 3,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "right",
        "image": "design.png",
        "blockOrder": 3,
        "productId": 1
    }
    ]
  },
  {
    "id": 2,
    "name": "iPhone 16 Pro",
    "price": 40999,
    "discount": 0,
    "image": "iphone-16-pro.png",
    "description": "Iphone 16",
    "count": 325,
    "categoryId": 2,
    "blocks": [
      {
        "id": 1,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "left",
        "image": "design.png",
        "blockOrder": 1,
        "productId": 1
      },
      {
        "id": 2,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "center",
        "image": "design.png",
        "blockOrder": 2,
        "productId": 1
    },
    {
        "id": 3,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "right",
        "image": "design.png",
        "blockOrder": 3,
        "productId": 1
    }
    ]
  }
]
```
</details>

<br>
<hr>
<br>

### Створення товару | Product creating

```
POST /products
```
  | **Status-code \| Статус-код** | **Description \| Опис** |
  | --- | --- |
  | 201 | Succes created \| Успішно створено |
  | 422 | Not enough information \| Недостатньо інформації |
  | 500 | Server error \| Внутрішня помилка сервера |
<details>
<summary>Відповідь | Response</summary>

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 45999,
    "discount": 50,
    "image": "iphone-15-pro.png",
    "description": "Iphone 15",
    "count": 35,
    "categoryId": 1,
    "blocks": [
      {
        "id": 1,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "left",
        "image": "design.png",
        "blockOrder": 1,
        "productId": 1
      },
      {
        "id": 2,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "center",
        "image": "design.png",
        "blockOrder": 2,
        "productId": 1
    },
    {
        "id": 3,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "right",
        "image": "design.png",
        "blockOrder": 3,
        "productId": 1
    }
    ]
  }
]
```
</details>

<br>
<hr>
<br>

### Конкретний товар | Specific product
```
GET /products/:id
```
  | **Status-code \| Статус-код** | **Description \| Опис** |
  | --- | --- |
  | 200 | Success \| Успіх |
  | 400 | Incorrect request \| Некоректий запит |
  | 500 | Server error \| Внутрішня помилка сервера |

<details>
<summary>Відповідь | Response</summary>

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 45999,
    "discount": 50,
    "image": "iphone-15-pro.png",
    "description": "Iphone 15",
    "count": 35,
    "categoryId": 1,
    "blocks": [
      {
        "id": 1,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "left",
        "image": "design.png",
        "blockOrder": 1,
        "productId": 1
      },
      {
        "id": 2,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "center",
        "image": "design.png",
        "blockOrder": 2,
        "productId": 1
    },
    {
        "id": 3,
        "title": "Дизайн",
        "description": "Міцний титановий корпус та тонкі рамки",
        "blockAlign": "right",
        "image": "design.png",
        "blockOrder": 3,
        "productId": 1
    }
    ]
  }
]
```
</details>

<br>
<hr>
<br>

### Видалення товару | Product deleting

```
DELETE /products/:id
```
  | **Status-code \| Статус-код** | **Description \| Опис** |
  | --- | --- |
  | 200 | Success \| Успіх |
  | 400 | Incorrect request \| Некоректий запит |
  | 500 | Server error \| Внутрішня помилка сервера |

<details>
<summary>Відповідь | Response</summary>

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 45999,
    "discount": 50,
    "image": "iphone-15-pro.png",
    "description": "Iphone 15",
    "count": 35,
    "categoryId": 1
  }
]
```
</details>

<br>
<hr>
<br>

### Оновлення товару | Product updating

```
PATCH /products/:id
```

  | **Status-code \| Статус-код** | **Description \| Опис** |
  | --- | --- |
  | 200 | Success \| Успіх |
  | 400 | Incorrect request \| Некоректий запит |
  | 422 | Not enough information \| Недостатньо інформації |
  | 500 | Server error \| Внутрішня помилка сервера |
  
<details>
<summary>Відповідь | Response</summary>

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 45999,
    "discount": 50,
    "image": "iphone-15-pro.png",
    "description": "Iphone 15",
    "count": 35,
    "categoryId": 1
  }
]
```
</details>

<!-- 
  | 201 | Succes created \| Успішно створено |
  | 204 | Without information \| Немає інформації |
  | --- | --- |
  | 400 | Incorrect request \| Некоректий запит |
  | 401 | Not authorized \| Не авторизований |
  | 402 | Payment required \| Потрібна оплата |
  | 403 | Forbidden \| Заборонено |
  | 404 | Not found \| Не знайдено |
  | 410 | Deleted \| Видалено |
  | 422 | Not enough information \| Недостатньо інформації |
  | --- | --- |
  | 500 | Server error \| Внутрішня помилка сервера |
  | 507 | Storage full \| Сховище заповнено | -->