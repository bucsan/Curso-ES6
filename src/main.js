import api from './api';

class App{
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');        

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true) {
        if(loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0)
            return;
        
        this.setLoading();

        try {
            const response = await api.get(`/repos/${repoInput}`);
            
            const {name, description, html_url, owner: { avatar_url }} = response.data;

            console.log(response);

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';

            this.render();
        } catch (err) {
            alert('O repositório não existe!');
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let tittleEl = document.createElement('strong');
            tittleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(tittleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();



/* Axios
import axios from 'axios';

class Api {
    static async getUserInfo(username) {
        try {
            const response = await axios.get(`https:/api.github.com/users/${username}`);
            console.log(response);
        } catch (err) {
            console.warn('Usuário não encontrado!');
        }        
    }
}

Api.getUserInfo('bucsan');
Api.getUserInfo('bucsan1234'); */


/* Async/Await
const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => { resolve('OK')}, 2000);
});

//minhaPromise().then(response => {
//    console.log(response);
//})
//.catch(err => {
//    
//});

async function executaPromise() {
    //const response = await minhaPromise();
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());

    //console.log(response);
}

//Utilizando Arrow Functions

const executaPromiseArrow = async () => {
    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
};

executaPromise();
executaPromiseArrow(); */

/* //Object Short Syntax
const nome = 'Diego';
const idade = 23;

const usuario = {
    nome,
    idade,
    empresa: 'Rocketseat',
};

console.log(usuario); */

/* //Template Literals
const nome = "Diego";
const idade = 23;

//console.log('Meu nome é ' + nome + ' e tenho ' + idade + ' anos.');
console.log(`Meu nome é ${nome} e tenho ${idade} anos.`); */

/* //Rest-spread (Necessário instalar em foma de plugins)
//yarn add @babel/plugin-proposal-object-rest-spread

//REST
const usuario = {
    nome: 'Diego',
    idade: 23,
    empresa: 'Rocktseat',
};

const {nome, ...resto} = usuario;

console.log(nome);
console.log(resto);

//SPREAD

const arr1 = [1,2,3];
const arr2 = [4,5,6];

const arr3 = [...arr1, ...arr2];

console.log(arr3);

const usuario1 = {
    nome: 'Diego',
    idade: 23,
    empresa: 'Rocketseat',
}

const usuario2 = {...usuario1, nome: 'Gabriel'};

console.log(usuario2); */


/* //Desestruturação
const usuario = {
    nome: 'Diego',
    idade: 23,
    endereco: {
        cidade: 'Rio do Sul',
        estado: 'SC',
    },
};

//const { nome, idade, endereco: { cidade } } = usuario;
//console.log(nome);
//console.log(idade);
//console.log(cidade); 

function mostraNome({nome, idade}){
    console.log(nome, idade);
}

mostraNome(usuario); */

/* //Valores padrões nas functions, neste caso na Arrow Function
const soma =(a = 3,b = 6) => a + b;

console.log(soma(1));
console.log(soma()); */

/* //Arrow Functions
const arr = [1,3,4,5,6];

const newArr = arr.map(item => item * 2);

console.log(newArr);

const teste = () => ({ nome: 'Diego' });

console.log(teste); */

/* //Array (vetores)
const arr = [1,3,4,5,8,9];

// Map - percorre todo o vetor.
const newArr = arr.map(function(item, index){
    return item + index;
});

console.log(newArr);

const sum = arr.reduce(function(total, next){
    return total + next;
});

console.log(sum);

// Filter - filtra de acordo com a validação da function sempre "true/false", sendo obrigatório.
const filter = arr.filter(function(item){
    return item % 2 === 0;
});

console.log(filter);

const find = arr.find(function(item){
    return item === 4;
});

console.log(find); */

/* //Escopo
function teste(x){
    let y = 2; //variavel de escopo.

    if(x > 5){
        let y = 4; //possível reatribuir o valor de 'y'
        console.log(x,y);
    }
} 

//console.log(y); gera erro devi a 'y' pertencer somente ao escopo da fuunção 'teste'

teste(10); */

/* //Mutaçãona constante
const usuario = {nome: 'Diego'};

usuario.nome = 'Cleiton';

console.log(usuario); */

/* //Não é possível reatribuir um valor a constate
const a = 1;

a = 3; */

/* //Foma correta de utilizar metodos estaticos
class Matematica {
    static soma(a, b){
        return a + b;
    }
}

console.log(Matematica.soma(1,2)); */


/* //Forma erra de utilizar metodos staticos
class TodoList{
    constructor(){
        this.todos = [];
    }

    static addTodo(){
        this.todos.push('Novo tdo');
        console.log(this.todo);
    }
}

TodoList.addTodo();
 */

/* //Herança
class List {
    constructor(){
        this.data = [];
    }

    add(data){
        this.data.push(data);
        console.log(this.data);
    }
}

class TodoList extends List{
    constructor(){
        super();

        this.usuario = 'Diego';
    }

    mostraUsuario(){
        console.log(this.usuario);
    }
}

var MinhaLista = new TodoList();

document.getElementById('novoTodo').onclick = function(){
    MinhaLista.add('NovoTodo');
}

MinhaLista.mostraUsuario(); */