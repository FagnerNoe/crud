const cadastrar = document.getElementById('cadastro');
const consultar = document.getElementById('consulta');



const modal = document.querySelector('.modal-container');
const modalCadastro = document.querySelector('.modal');
const tbody = document.querySelector('tbody');
const modalConsulta = document.querySelector('.tabela');
const detalhes = document.querySelector('.detalhes');
const opcao = document.querySelector('.opcaoDeletar');


const cNome = document.querySelector('#nome');
const cNascimento = document.querySelector('#nascimento');
const cEndereco = document.querySelector('#endereco');
const cTelefone = document.querySelector('#telefone');
const cEmail = document.querySelector('#email');

const detNome = document.querySelector('#detNome');
const detTelefone = document.querySelector('#detTelefone');
const detAno = document.querySelector('#detAno');
const detEndereco = document.querySelector('#detEndereco');
const detEmail = document.querySelector('#detEmail');


const salvar = document.querySelector('#btnSalvar');


cadastrar.addEventListener('click', () =>{
    openModalCadastro(false,'')
});


consultar.addEventListener('click', openModalConsulta);


let clientes;
let id;

const getClientesBD = () => JSON.parse(localStorage.getItem('dbclientes')) ?? [];
const setClientesBD = () => localStorage.setItem('dbclientes', JSON.stringify(clientes));


function loadClientes() {  // funcao que pega o array no localStorage e atribui o valor do array em clientes..
    clientes = getClientesBD(); 
    tbody.innerHTML = '';
    clientes.forEach((item, index) => {  // forEach vai percorrer o array e iterar cada item e seu indice ...chamando a funcao insertClientes passando cada item do array...
        insertCliente(item, index)
    });
}

loadClientes();  //chamando a funcao que faz a iteracao dos clienetes no banco..

function insertCliente(item, index) {    //funcao que pega a iteracao de cada item e mostra no corpo da tabela em consulta..
    let tr = document.createElement('tr');

    tr.innerHTML = `    
    <td>${item.nome}</td>
    <td>${item.telefone}</td>
    <td><button onclick="openDetalhes(${index})"><i class="bx bxs-spreadsheet bx-sm"></i></button></td>`

    tbody.appendChild(tr);
};

function openModalCadastro(edit=false, index= 0){
    modal.classList.add('active');

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') != -1) {
            modal.classList.remove('active');
        }
    }
    
    if(edit){        
        cNome.value = clientes[index].nome;
        cNascimento.value = clientes[index].nascimento;
        cEndereco.value = clientes[index].endereco;
        cTelefone.value = clientes[index].telefone;
        cEmail.value = clientes[index].email;
        id = index;
    }
    else{
        cNome.value = ''
        cNascimento.value = ''
        cEndereco.value = ''
        cTelefone.value = ''
        cEmail.value = ''
    };
    
}

salvar.onclick = () => {   // clique do botao salvar em cadastro...
    
    if(cNome.value == '' || cNascimento.value == '' || cEndereco.value == '' || cTelefone.value == '' || cEmail.value == '' ){
        return
    }        
    

    if (id != undefined){
        clientes[id].nome = cNome.value;
        clientes[id].nascimento = cNascimento.value;
        clientes[id].endereco = cEndereco.value;
        clientes[id].telefone = cTelefone.value;
        clientes[id].email = cEmail.value;

        setClientesBD();
    }
    else{
        clientes.push({
            'nome': cNome.value,
            'nascimento': cNascimento.value,
            'endereco': cEndereco.value,
            'telefone': cTelefone.value,
            'email': cEmail.value
        });

        id = undefined;
        
        setClientesBD();
        modal.classList.remove('active')

        loadClientes();
       
    }

}



function openModalConsulta() {
    modalConsulta.classList.add('active');

    setClientesBD();
    modalConsulta.onclick = e => {
        if (e.target.className.indexOf('tabela') != -1) {
            modalConsulta.classList.remove('active');
        }
    }
}

function openDetalhes(index) {
    detalhes.classList.add('active');

    detalhes.onclick = e => {
        if (e.target.className.indexOf('detalhes') != -1) {
            detalhes.classList.remove('active');
        }
    }
    detNome.innerHTML = clientes[index].nome;
    detAno.innerHTML = clientes[index].nascimento;
    detEndereco.innerHTML = clientes[index].endereco;
    detTelefone.innerHTML = clientes[index].telefone;
    detEmail.innerHTML = clientes[index].email;

    document.getElementById('editar').addEventListener('click', () => {
        openModalCadastro(true, index);
        modalConsulta.classList.remove('active');
        detalhes.classList.remove('active');
    })    


    document.getElementById('excluir').addEventListener('click', () =>{
        option(index);
        opcao.classList.add('active');
    });        
    
}

function option(index){
    opcao.innerHTML = '';
    let caixa = document.createElement('div');

    caixa.classList.add('box');

    caixa.innerHTML = `
    <span>Tem Certeza ?</span>
    <div class="opcoes">
        <button onclick="deletar(${index})"><i class='bx bx-check'></i>Confirmar</button>
        <button onclick="retornar()"><i class='bx bx-x'></i>Cancelar</button>
    </div>
     `

    opcao.appendChild(caixa);   

    
    
    
}

function deletar(index){
    clientes.splice(index, 1);

    setClientesBD();
    opcao.classList.remove('active');
    detalhes.classList.remove('active');

    loadClientes();
}


function retornar(){   
    opcao.classList.remove('active');
    detalhes.classList.remove('active');
    

}


function mascara() {             //funcao que adiciona o formato do telefone com ddd no input
    if (cTelefone.value.length == 0) {
        cTelefone.value = '(' + cTelefone.value; //qd começa a digitar ,insere um ( no inicio do input
    }
    if (cTelefone.value.length == 3) {
        cTelefone.value = cTelefone.value + ')';  //qd  tiver tres caracteres (xx é inserido mais um parenteses  
    }
    if (cTelefone.value.length == 9) {
        cTelefone.value = cTelefone.value + '-';  //qd tiver oito caracteres inserirá um - pra melhor visualizar  o numero 
    }
}

