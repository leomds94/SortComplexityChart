function initializeChart() {
    var i, n;
    if (typeof window == "undefined") {
        return false;
    }

    Array.prototype.swap = function (x, y) {
        var b = this[x];
        this[x] = this[y];
        this[y] = b;
        return this;
    }

    $("#plotchart").click(function () {
        var data1 = [];
        var data2 = [];
        var narr = [];
        var array = [];

        n = parseInt($("#nvalue").val());

        for (i = 1; i <= n; i++) {
            narr.push(i);
        }

        if ($('#insertion').is(":checked")) {
            var compinsertion = [];

            for (var rep = 1; rep <= n; rep++) {
                var array = [];
                for (i = 0; i < n; i++) {
                    array.push(Math.random());
                }
                var t0 = performance.now() * 1000000;
                var currInd;
                for (i = 1; i < rep; i++) {
                    var currInd = i;
                    while (currInd > 0 && array[currInd] < array[currInd - 1]) {
                        array.swap(currInd, currInd - 1);
                        currInd = currInd - 1;
                    }
                }
                var t1 = performance.now() * 1000000;
                compinsertion.push(t1 - t0);
            }

            data1.push({
                x: narr,
                y: compinsertion,
                mode: 'lines',
                name: 'Insertion Sort',
                line: {
                    color: 'rgb(212, 63, 58)'
                }
            })

            var compn2 = [];

            for (i = 1; i <= n; i++) {
                compn2.push(Math.pow(i, 2));
            }

            data2.push({
                x: narr,
                y: compn2,
                mode: 'lines',
                name: 'n²',
                line: {
                    color: 'rgb(212, 63, 58)'
                }
            })
        }

        if ($('#selection').is(":checked")) {
            var compselection = [];

            for (var rep = 1; rep <= n; rep++) {
                var array = [];
                for (i = 0; i < n; i++) {
                    array.push(Math.random());
                }
                var t0 = performance.now() * 1000000;
                var indexMin;
                for (i = 0; i < rep - 1; i++) {
                    var indexMin = i;
                    for (var j = i + 1; j < rep; j++) {
                        if (array[j] < array[indexMin]) {
                            indexMin = j;
                        }
                    }
                    array.swap(indexMin, i);
                }
                var t1 = performance.now() * 1000000;
                compselection.push(t1 - t0);
            }

            data1.push({
                x: narr,
                y: compselection,
                mode: 'lines',
                name: 'Selection Sort',
                line: {
                    color: 'rgb(46, 109, 164)'
                }
            })

            var compn2 = [];

            for (i = 1; i <= n; i++) {
                compn2.push(Math.pow(i, 2));
            }

            data2.push({
                x: narr,
                y: compn2,
                mode: 'lines',
                name: 'n²',
                line: {
                    color: 'rgb(46, 109, 164)'
                }
            })
        }

        if ($('#quick').is(":checked")) {
            var compquick = [];
            function quicksort(vet, esq, dir) {
                var pivo = esq, i, ch, j;
                for (i = esq + 1; i <= dir; i++) {
                    j = i;
                    if (vet[j] < vet[pivo]) {
                        ch = vet[j];
                        while (j > pivo) {
                            vet[j] = vet[j - 1];
                            j--;
                        }
                        vet[j] = ch;
                        pivo++;
                    }
                }
                if (pivo - 1 >= esq) {
                    quicksort(vet, esq, pivo - 1);
                }
                if (pivo + 1 <= dir) {
                    quicksort(vet, pivo + 1, dir);
                }
            }

            for (var rep = 1; rep <= n; rep++) {

                var array = [];
                for (i = 0; i < n; i++) {
                    array.push(Math.random());
                }
                var t0 = performance.now() * 1000000;
                quicksort(array, 0, rep - 1);
                var t1 = performance.now() * 1000000;
                compquick.push(t1 - t0);
            }

            data1.push({
                x: narr,
                y: compquick,
                mode: 'lines',
                name: 'Quick Sort',
                line: {
                    color: 'rgb(76, 174, 76)'
                }
            })

            var compnlogn = [];

            for (i = 1; i <= n; i++) {
                compnlogn.push(i * Math.log2(i));
            }

            data2.push({
                x: narr,
                y: compnlogn,
                mode: 'lines',
                name: 'n*log(n)',
                line: {
                    color: 'rgb(76, 174, 76)'
                }
            })
        }

        if ($('#heap').is(":checked")) {
            var compheap = [];

            function heapify(input, i) {
                var left = 2 * i + 1;
                var right = 2 * i + 2;
                var largest = i;

                if (left < arrayLength && input[left] > input[largest]) {
                    largest = left;
                }

                if (right < arrayLength && input[right] > input[largest]) {
                    largest = right;
                }

                if (largest != i) {
                    input.swap(i, largest);
                    heapify(input, largest);
                }
            }

            function heapSort(input) {
                arrayLength = input.length;

                for (var i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
                    heapify(input, i);
                }

                for (var i = input.length - 1; i > 0; i--) {
                    input.swap(0, i);
                    arrayLength--;
                    heapify(input, 0);
                }
            }

            for (var rep = 1; rep <= n; rep++) {

                var array = [];
                for (i = 0; i < n; i++) {
                    array.push(Math.random());
                }
                var t0 = performance.now() * 1000000;
                heapSort(array);
                var t1 = performance.now() * 1000000;
                compheap.push(t1 - t0);
            }

            data1.push({
                x: narr,
                y: compheap,
                mode: 'lines',
                name: 'Heap Sort',
                line: {
                    color: 'rgb(238, 162, 54)'
                }
            })

            var compnlogn = [];

            for (i = 1; i <= n; i++) {
                compnlogn.push(i * Math.log2(i));
            }

            data2.push({
                x: narr,
                y: compnlogn,
                mode: 'lines',
                name: 'n*log(n)',
                line: {
                    color: 'rgb(238, 162, 54)'
                }
            })
        }

        // if ($('#merge').is(":checked")) {
        //     var compfac = [];
        //     var fac;

        //     for (i = 1; i <= n; i++) {
        //         var fac = 1;
        //         for (var j = 1; j <= i; j++) {
        //             fac *= j;
        //         }
        //         compfac.push(fac);
        //     }

        //     data.push({
        //         x: narr,
        //         y: compfac,
        //         mode: 'lines',
        //         name: 'n!'
        //     })
        // }

        var layout = {
            title: 'Gráfico de Complexidades',
            height: 500,
            width: 800
        };

        Plotly.newPlot('chart1', data1, layout);

        Plotly.newPlot('chart2', data2, layout);
    });
}
initializeChart();