var app = new Vue({
    el: '#app',
    created: function () {
        this.sortCase();
    },
    data: {

        todoLists: [
            { id: 1, name: "ToDo List", radio: "sortAlphabet", complete: false, flagCheck: false },
            { id: 2, name: "kuytest", radio: "sortAlphabet", complete: false, flagCheck: false }
        ],

        task: [
            {
                id: 1,
                name: "8",
                complete: true,
                hide: false,
                flagCheck: true,
                date: "2021-05-01",
                flagColor: 'flagRed',
                listId: 1
            },
            {
                id: 2,
                name: "4",
                complete: false,
                hide: false,
                flagCheck: true,
                date: "2021-06-02",
                flagColor: 'flagBlack',
                listId: 1
            },
            {
                id: 3,
                name: "3",
                complete: true,
                hide: false,
                flagCheck: true,
                date: "2021-02-03",
                flagColor: 'flagBlack',
                listId: 2
            },

            {
                id: 4,
                name: "2",
                complete: true,
                hide: false,
                flagCheck: false,
                date: "2021-01-03",
                flagColor: 'flagGreen',
                listId: 1
            },
            {
                id: 5,
                name: "9",
                complete: false,
                hide: false,
                flagCheck: true,
                date: "",
                flagColor: 'flagGreen',
                listId: 1
            },
            {
                id: 6,
                name: "1",
                complete: false,
                hide: false,
                flagCheck: false,
                date: "2021-03-03",
                flagColor: 'flagGreen',
                listId: 2
            }],




        taskName: '',
        editModal: false,
        removeModal: false,
        taskNameEdit: '',
        modalIndex: 0,
        hideComplete: false,
        backupCondition: false,
        flagCheck: false,
        flagColor: 'flagBlack',
        date: '',
        taskNameInvalid: false,
        invalidCase: false,

        taskNameModal: '',
        taskNameModalInvalid: false,
        invalidCaseModal: false,

        showFlagTask: false,
        sortRadio: 'sortAlphabet',

        //---------------//
        idCount: 7,
        listIdCount: 3,
        //---------------//

        addListModal: false,
        addListName: '',
        addListNameInvalid: false,
        invalidCaseList: false,
        listSelected: 'selectList',
        listSelectedModal: '',
        listSelectedId: 0,
        listIndexNow: 0,

        editListModal: false,
        editListName: '',
        editListNameInvalid: false,
        invalidCaseEditList: false,
        loltest: 'has-text-warning',

        removeListModal: false,

        selectDropdownInvalid: false,
        invalidCaseDropdown: false,
        selectedNoneCase: false,
        overing: false,
        hideFilterOn: false,
        anyChecking: 0

    },
    methods: {
        addTask() {
            this.selectedNoneCase = true;
            if (this.listSelected == 'selectList') {
                if (this.taskName.length == 0) this.invalidCase = true;
                this.selectDropdownInvalid = true;

            }
            else if (this.taskName.length > 0) {
                this.task.push({
                    id: this.idCount,
                    name: this.taskName,
                    complete: false,
                    hide: false,
                    flagCheck: this.flagCheck,
                    date: this.date,
                    flagColor: this.flagColor,
                    listId: this.listSelectedId
                });

                this.invalidCase = false;
                this.taskName = '';
                this.flagCheck = false;
                this.flagColor = 'flagBlack';
                this.date = '';
                this.listSelected = 'selectList';

                this.idCount++;

                this.sortCase();
                this.hideFilter();

                this.selectDropdownInvalid = false;
                this.selectedNoneCase = false
            }
            else {
                this.invalidCase = true;
            }
        },

        editTask(index, editOrExit) {
            if (editOrExit == 'edit' && this.taskNameModal.length > 0) {
                this.task[index].name = this.taskNameModal;
                this.task[index].flagCheck = this.flagCheck;
                this.task[index].date = this.date;
                this.task[index].flagColor = this.flagColor;
                this.task[index].listId = this.listSelectedId;

                this.editModal = false;

                this.invalidCaseModal = false

                this.flagCheck = false;
                this.date = '';
                this.flagColor = 'flagBlack'

                this.sortCase();
                this.hideFilter();

            }
            else if (editOrExit == 'edit') {
                this.invalidCaseModal = true;
            }
            else if (editOrExit == 'exit') {
                this.editModal = false;
            }

        },

        removeTask(index, status) {
            if (status) {
                this.task.splice(index, 1);
            }
        },

        sortCase() {


            this.sortListId();

            this.todoLists.forEach(x => {

                if (x.radio == "sortAlphabet") this.sortAlphabet(x.id);

                else if (x.radio == "sortIncomplete") this.sortIncomplete(x.id);

                else if (x.radio == "sortFlag") this.sortFlag(x.id);

                else if (x.radio == "sortByDate") this.sortByDate(x.id);
            })

        },

        sortListId() {
            function compare(a, b) {

                if (a.listId > b.listId) {
                    return 1;
                }
                else if (a.listId < b.listId) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
            this.task.sort(compare);
        },

        sortAlphabet(idNumber) {

            function compare(a, b) {
                if (a.listId == idNumber && a.listId == b.listId) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    else if (a.name < b.name) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            this.task.sort(compare);

        },

        sortIncomplete(idNumber) {

            function compare(a, b) {
                if (a.listId == idNumber && a.listId == b.listId) {
                    if (a.complete < b.complete) return -1;
                    else if (a.complete > b.complete) return 1;
                    else return 0;
                }
            }
            this.task.sort(compare);
        },

        sortFlag(idNumber) {

            //flag sort
            function compare(a, b) {

                if (a.listId == idNumber && a.listId == b.listId) {
                    console.log('res = ', a.name, b.name);

                    if (a.flagCheck < b.flagCheck) return 1;
                    else if (a.flagCheck > b.flagCheck) return -1;
                    else return 0;

                }
            }

            //flag color sort
            function compare2(a, b) {

                if (a.listId == idNumber && a.listId == b.listId) {


                    if (b.flagColor == 'flagRed') return -1
                    if (b.flagColor == 'flagBlack') return -1

                }
            }



            this.task.sort(compare2);
            this.task.sort(compare);

            //this.sortColor();
        },

        sortColor() {
            this.todoLists.forEach((list, listIndex) => {
                this.task.forEach((item, index) => {
                    var frontIndex = 0;
                    var temp = '';
                    if (list.id == item.listId && item.flagCheck) {
                        if (item.flagColor == 'flagGreen') {
                            //console.log('index = ', index);

                            //console.log('green = ', index, 'swap with ', this.task[frontIndex].flagColor);
                            //console.log('before ', item[index].flagColor, 'to', item[frontIndex].flagColor);

                            temp = item[frontIndex];
                            item[frontIndex] = item[index];
                            item[index] = temp;
                            frontIndex++;
                            //console.log('after ', item[index].flagColor, 'to', item[frontIndex].flagColor);


                        }
                    }

                });
            });

        },


        sorasdtColor() {
            function compareBR(a, b) {


                if (a.flagCheck && b.flagCheck) {


                    if (this.changeColorToNumber(a.flagColor, 1) < this.changeColorToNumber(b.flagColor, 1) == 'flagRed') return 1;
                    else if (this.changeColorToNumber(a.flagColor, 1) > this.changeColorToNumber(b.flagColor, 1)) return -1;
                    else return 0;
                }

            };

            function compareRG(a, b) {

                if (a.flagCheck == b.flagCheck) {


                    if (a.flagColor == 'flagRed' && b.flagColor == 'flagGreen') return 1;
                    else if (a.flagColor == 'flagGreen' && b.flagCheck == 'flagRed') return -1;
                    else if (a.flagColor == b.flagColor) return 0;
                }
            }
            this.task.sort(compareBR);
            //this.task.sort(compareRG);


        },

        changeColorToNumber(val, condi) {
            if (val == 'flagBlack' && condi == 1) return '0';
            else if (val == 'flagRed') return '1';
            else if (val == 'flagGreen' && condi == 2) return '2';
        },

        sortByDate(idNumber) {

            function compare(a, b) {
                if (a.listId == idNumber && a.listId == b.listId) {


                    if (a.date < b.date) return -1;
                    else if (a.date > b.date) return 1;
                    else return 0;



                }
            }

            function compareBlankDate(a, b) {
                if (a.listId == idNumber && a.listId == b.listId) {


                    if (b.date == '' || a.date == '') return -1;



                }
            }

            this.task.sort(compare);
            this.task.sort(compareBlankDate);
        },

        hideFilter() {

            this.todoLists.forEach(list => {
                this.task.forEach(item => {

                    if (item.listId == list.id) {
                        item.hide = false;

                        if (list.complete && item.complete && !list.flagCheck) {


                            item.hide = true
                        }

                        else if (!list.complete && !item.flagCheck && list.flagCheck) {

                            item.hide = true
                        }
                        //flag = false > hide, complete = true > hide
                        else if (list.complete && list.flagCheck) {

                            if (!item.flagCheck) item.hide = true;
                            if (item.complete) item.hide = true;

                        }

                    }


                })
            });

        },

        hideUnflagFilter() {

            // this.todoLists.forEach(list => {
            //     this.task.forEach(item => {

            //         if (list.flagCheck && !item.flagCheck && item.listId == list.id) {

            //             item.hide = true;
            //         }

            //         else if (!list.flagCheck && item.listId == list.id) {

            //             item.hide = false;

            //         }
            //     })
            // })
        },

        addList() {
            if (this.addListName.length > 0) {
                this.todoLists.push({
                    id: this.listIdCount,
                    name: this.addListName,
                    radio: "sortAlphabet",
                    complete: false,
                    flagCheck: false
                });

                this.listIdCount++;

                this.invalidCaseList = false;

                this.sortCase();

                this.addListModal = false;

                this.addListName = '';

            }
            else {
                this.invalidCaseList = true;
            }
        },

        editListNameFn() {

            if (this.editListName.length > 0) {

                this.todoLists[this.listIndexNow].name = this.editListName;

                this.editListModal = false

                this.invalidCaseEditList = false;

            }

            else {

                this.invalidCaseEditList = true

            }
        },

        removeList() {

            //console.log(this.task.length);

            for (var i = this.task.length - 1; i >= 0; i--) {
                //console.log(i);

                //console.log(this.task[i].listId, 'and', this.listSelectedId);

                if (this.task[i].listId == this.listSelectedId) {
                    //console.log(this.task[i].name);

                    this.task.splice(i, 1);
                }

            }

            this.todoLists.splice(this.listIndexNow, 1);

        },

        selectedNone() {

            if (this.listSelected == 'selectList' && this.selectedNoneCase) {

                this.selectDropdownInvalid = true;
            }
            else if (this.selectedNoneCase) {

                this.selectDropdownInvalid = false;
            }
        },

        hideComp() {
            this.todoLists.forEach((x, i) => {

                if (this.task[i].complete && x.complete) x.hide = true;


                else if (this.task[i].complete && x.complete) x.hide = false;

            });
        }
    },

    watch: {






        dueDate(date) {
            var dateFormat = new Intl.DateTimeFormat('en-CA');
            return dateFormat.format(Date.parse(date))

        },



        taskName() {
            if (this.taskName.length < 1 && this.invalidCase) {
                this.taskNameInvalid = true;
            }
            else this.taskNameInvalid = false;
        },

        invalidCase() {
            if (this.invalidCase) {
                this.taskNameInvalid = true;
            }
        },

        taskNameModal() {
            if (this.taskNameModal.length < 1 && this.invalidCaseModal) {
                this.taskNameModalInvalid = true;
            }
            else this.taskNameModalInvalid = false;
        },

        invalidCaseModal() {
            if (this.invalidCaseModal) {
                this.taskNameModalInvalid = true;
            }
        },

        addListName() {
            if (this.addListName.length < 1 && this.invalidCaseList) {
                this.addListNameInvalid = true;
            }
            else this.addListNameInvalid = false;
        },

        invalidCaseList() {
            if (this.invalidCaseList) {
                this.addListNameInvalid = true;
            }

        },

        invalidCaseEditList() {
            if (this.invalidCaseEditList) {
                this.editListNameInvalid = true;
            }

        },

        editListName() {
            if (this.editListName.length < 1 && this.invalidCaseEditList) {
                this.editListNameInvalid = true;
            }
            else this.editListNameInvalid = false;
        },

        invalidCaseDropdown() {
            console.log('za');

            if (this.invalidCaseDropdown) {
                console.log('invalid');

                this.selectDropdownInvalid = true
            }
        },





        showFlagTask(newV, oldV) {
            this.task.forEach(x => {
                if (newV && !x.flagCheck) {
                    x.hide = true;
                }

                else if (oldV && !x.flagCheck) {
                    x.hide = false;
                }
            });
        },

        todoLists: {
            deep: true,
            handler() {
                this.sortCase();

                this.hideFilter();



            }
        },






        listSelected() {

            // for (var i = 0; i < this.todoLists.length; i++) {
            //     console.log(this.todoLists.length);

            //     if (this.listSelected == this.todoLists[i].name) this.listSelectedId = this.todoLists[i].id;
            // }
            this.todoLists.forEach((x, index) => {

                if (this.listSelected == x.name) this.listSelectedId = x.id;
            })
        },
        listSelectedId() {
            this.todoLists.forEach((x, index) => {
                if (x.id == this.listSelectedId) this.listIndexNow = index;
            })
        },

        listSelectedModal() {
            // for (var i = 0; i < this.todoLists.length; i++) {
            //     if (this.listSelected == this.todoLists[i].name) this.listSelectedId = x.id;
            // }

            this.todoLists.forEach(x => {
                if (this.listSelectedModal == x.name) this.listSelectedId = x.id;
            })
        }
        //this.sortCase();



        /*
        sortIncomplete() {
     
            var temp = false;
            var index = 0;
            var caseCondition = false;
     
     
            if (this.backupCondition == false) this.taskBackup = this.task;
     
            if (this.sortIncomplete == true) {
                for (var i = 0; i < this.task.length; i++) {
                    for (var j = 0; j < this.task.length - i - 1; j++) {
                        if (this.task[i].complete && caseCondition == false) {
                            caseCondition = true;
                            index = i;
                        }
                        else if (this.task[i].complete == false && caseCondition) {
                            temp = this.task[index];
                            this.task[index] = this.task[i];
                            this.task[i] = temp;
                            caseCondition = false;
     
                            this.backupCondition = true
     
                        }
                    }
                }
            }
            else {
                this.task = this.taskBackup;
                this.backupCondition = false;
     
            }
            caseCondition = false;
     
        }*/


    },

    computed: {
        completeTask() {
            var val = 0;
            this.task.forEach(x => {
                if (x.complete == true) {
                    val++
                }
            });
            return val;
        },

        inCompleteTask() {
            var val = 0;
            this.task.forEach(x => {
                if (x.complete == false) {
                    val++
                }
            });
            return val;
        },

        flaggedCount() {
            var val = 0;

            this.task.forEach(x => {
                if (x.flagCheck) {
                    val++;
                }
            });
            return val;
        }
    }


})