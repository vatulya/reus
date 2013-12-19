(function(window, document, $){
    var Renderer = function(canvas)
    {
        canvas = $(canvas).get(0);
        var ctx = canvas.getContext("2d");
        var particleSystem;

        var elementWidth = 50; //ширина квадрата
        var elementWidthHalf = elementWidth / 2;

        var that = {
            init:function(system){
                //начальная инициализация
                particleSystem = system;
                particleSystem.screenSize(canvas.width, canvas.height);
                particleSystem.screenPadding(0);
            },

            redraw:function(){
                //действия при перересовке
                ctx.fillStyle = "white"; //белым цветом
                ctx.fillRect(0,0, canvas.width, canvas.height); //закрашиваем всю область

                particleSystem.eachEdge( //отрисуем каждую грань
                    function(edge, pt1, pt2){ //будем работать с гранями и точками её начала и конца
                        pt1 = arbor.Point(edge.source.p.x, edge.source.p.y);
                        pt2 = arbor.Point(edge.target.p.x, edge.target.p.y);

//                        ctx.strokeStyle = "rgba(0,0,0, .333)"; //грани будут чёрным цветом с некой прозрачностью
//                        ctx.lineWidth = 1; //толщиной в один пиксель
                        ctx.beginPath();  //начинаем рисовать
                        ctx.moveTo(pt1.x, pt1.y); //от точки один
                        ctx.lineTo(pt2.x, pt2.y); //до точки два
                        ctx.stroke();
                    });

                particleSystem.eachNode( //теперь каждую вершину
                    function(node, pt){  //получаем вершину и точку где она
                        pt = arbor.Point(node.p.x, node.p.y);

                        ctx.fillStyle = "orange"; //с его цветом понятно
                        ctx.fillRect(pt.x - elementWidthHalf, pt.y - elementWidthHalf, elementWidth, elementWidth); //рисуем
//                        ctx.fillStyle = "black"; //цвет для шрифта
//                        ctx.font = 'italic 13px sans-serif'; //шрифт
//                        ctx.fillText (node.name, pt.x+8, pt.y+8); //пишем имя у каждой точки
                    });
            }

        }
        return that;
    }

    $(document).ready(function(){
        var sys = arbor.ParticleSystem(); // создаём систему
        sys.parameters({
            repulsion: 0,
            stiffness: 0,
            friction: 1,
            gravity: false,
            fps: 5,
            dt: 1,
            precision: 0
        });
        sys.renderer = Renderer("#viewport"); //начинаем рисовать в выбраной области

        var padding = 50;
        var colHeight = 100;
        var colWidth = 100;

        var data = window.data;
        $.each(data.nodes, function(i,node){
            var x = (node.col - 1) * colHeight + padding;
            var y = (node.row - 1) * colWidth + padding;
            sys.addNode(node.name, {fixed: true, x: x, y: y}); //добавляем вершину
        });

        $.each(data.edges, function(i,edge){
            sys.addEdge(sys.getNode(edge.src),sys.getNode(edge.dest), edge); //добавляем грань
        });

    })

})(this, this.document, this.jQuery)