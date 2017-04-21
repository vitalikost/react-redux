

function result_monitor(state=[], action) {
    switch (action.type) {
        case 'ADD':
            return  state.concat(action.result);
        case 'CLEAR':
            return  [];
        default:
            return state
    }
}

window.store = Redux.createStore(result_monitor);
window.Provider = ReactRedux.Provider;

//result
class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.add = this.add.bind(this);
        this.clear = this.clear.bind(this);

    }


    componentWillMount(){
    //Тут можно подписаться на события
        
    }

    add(){
        window.store.dispatch({type: "ADD",result: new Date()});
    }

    clear(){
        window.store.dispatch({type: "CLEAR"});
    }


    render() {


       return <div>
           <h1>Хранилице Редукс:</h1>

           <button id="add_redux" onClick={this.add}>Добавить</button>
           <button id="clear_redux" onClick={this.clear}>Очистить</button>
           {
               this.props.result.map(function(item, index){
                   return <div key={index} > {item.toString()}</div>
               })
           }

       </div>

    }

}
//Функция, которая вернет состояние хранилища
//Если редусов несколько, сдесь можно указать какой имено нужно
function mapStateToProps(state) {
    return { result: state };
}
//соединяем хранилище и компонент
window.reduxtest = ReactRedux.connect(mapStateToProps)(Result);

ReactDOM.render(
    <div>
    <window.Provider store = {window.store}>{/*Добавяем хранилище*/}
    <window.reduxtest  />{/*Добавяем полученый компонент */}
    </window.Provider>
    </div>,
    document.getElementById("root")
);

