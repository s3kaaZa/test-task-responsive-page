const DINAMIC_FORM = [
    {
        className: null,
        elements: [
            {
                elementType: 'input',
                type: 'email',
                elementTagName: 'input',
                label: null,
                placeholder: 'Email/Телефон',
                required: true,
                name: 'email'
            },
            {
                elementType: 'input',
                elementTagName: 'input',
                type: 'password',
                label: null,
                placeholder: 'Пароль',
                required: true,
                name: 'password'
            }
        ]
    },
    {
        className: 'remember',
        elements: [
            {
                elementType: 'input',
                type: 'checkbox',
                elementTagName: 'input',
                label: 'Запомнить пароль',
                labelPosition: 'after',
                placeholder: null,
                required: false,
                checked: true,
                href: null,
                name: 'remember-password'
            }
        ]
    },
    {
        className: null,
        elements: [
            {
                elementType: 'link',
                type: null,
                elementTagName: 'a',
                label: 'Восстановить',
                placeholder: null,
                required: false,
                checked: false,
                href: '#',
                classList: 'password-reset-link'
            }
        ]
    },
    {
        className: 'buttons',
        elements: [
            {
                elementType: 'button',
                type: 'submit',
                elementTagName: 'button',
                label: 'Войти',
                placeholder: null,
                required: false,
                checked: false,
                href: null,
                classList: 'login-button'
            },
            {
                elementType: 'button',
                type: 'button',
                elementTagName: 'button',
                label: 'Зарегистрироваться',
                placeholder: null,
                required: false,
                checked: false,
                href: null,
                classList: 'register-button'
            }
        ]
    }
];
const modalOverlay = document.querySelector('#modal-overlay');
const modal = document.querySelector('#modal');
const authForm = document.querySelector('#authForm');
let isExists = false;

document.addEventListener('click', e => {
    const target = e.target;

    if (target.closest('.button_main')) {
        openModal();
    } else if (target === document.querySelector('#modal-overlay') || target.closest('.close-button')) {
        closeModal();
    } else if (target.closest('.login-button')) {
        const fd = new FormData(authForm);
        alert(`Email: ${fd.get('email')} \nPassword: ${fd.get('password')} \nRemember passwords: ${fd.get('remember-password') ? 'Yes' : 'No'}`);
    }
});

function closeModal() {
    modalOverlay.style.display = 'none';
    modal.style.display = 'none';
}

function openModal() {
    if (!isExists) {
        createForm(DINAMIC_FORM);
        isExists = true;
    }
    modalOverlay.style.display = 'block';
    modal.style.display = 'block';
}

function createForm(form) {
    form.forEach(group => {
        const formGroup = createFormGroup(group);

        authForm.append(formGroup);
    });
}

function createFormGroup(group) {
    const fg = document.createElement('div');

    fg.classList.add('form-group');
    fg.classList.toggle(group.className, group.className);

    group.elements.forEach(element => appendElement(fg, element));

    return fg;
}

function appendElement(group, element) {
    switch (element.elementType) {
        case 'input':
            const inputLabel = element.label ? document.createElement('label') : null;
            const inputEl = Object.assign(document.createElement(element.elementTagName), {
                type: element.type,
                id: element.type,
                name: element.name,
                placeholder: element.placeholder,
                required: element.required
            });

            if (inputLabel) {
                inputLabel.setAttribute('for', element.type);
                inputLabel.insertAdjacentText('afterbegin', element.label);
                element.labelPosition === 'after' ?
                    group.append(inputEl, inputLabel) :
                    group.append(inputLabel, inputEl)
            } else {
                group.append(inputEl);
            }
            break;
        case 'link':
            const linkEl = Object.assign(document.createElement(element.elementTagName), {
                href: element.href,
                classList: element.classList,
                innerText: element.label
            });

            group.append(linkEl);
            break;
        case 'button':
            const buttonEl = Object.assign(document.createElement(element.elementTagName), {
                type: element.type,
                classList: element.classList,
                innerText: element.label
            });
            group.append(buttonEl);
            break;

        default:
            break;
    }
}
// option 2

// buttonMain.onclick = openModal();
// modalOverlay.onclick closeModal;
// closeButton.onclick = closeModal;