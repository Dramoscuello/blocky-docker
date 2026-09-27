import * as Blockly from "blockly/core";

import "blockly/blocks";

import {
    javascriptGenerator,
    Order as JavaScriptOrder
} from "blockly/javascript";

import {
    pythonGenerator,
    Order as PythonOrder
} from "blockly/python";

import * as Es from "blockly/msg/es";

import "./style.css";



/* =========================================================
   IDIOMA
   ========================================================= */

Blockly.setLocale(Es);



/* =========================================================
   BLOQUES PROPIOS
   ========================================================= */

Blockly.defineBlocksWithJsonArray([

    /* -----------------------------------------------------
       PEDIR TEXTO
       ----------------------------------------------------- */

    {
        "type": "pedir_texto",

        "message0": "pedir texto %1",

        "args0": [
            {
                "type": "field_input",
                "name": "MENSAJE",
                "text": "Escribe un texto:"
            }
        ],

        "output": "String",

        "colour": 210,

        "tooltip":
            "Solicita un texto al usuario"
    },


    /* -----------------------------------------------------
       PEDIR NÚMERO
       ----------------------------------------------------- */

    {
        "type": "pedir_numero",

        "message0": "pedir número %1",

        "args0": [
            {
                "type": "field_input",
                "name": "MENSAJE",
                "text": "Escribe un número:"
            }
        ],

        "output": "Number",

        "colour": 210,

        "tooltip":
            "Solicita un número al usuario"
    },


    /* -----------------------------------------------------
       MOSTRAR
       ----------------------------------------------------- */

    {
        "type": "mostrar",

        "message0": "mostrar %1",

        "args0": [
            {
                "type": "input_value",
                "name": "VALOR"
            }
        ],

        "previousStatement": null,
        "nextStatement": null,

        "colour": 160,

        "tooltip":
            "Muestra información en la salida"
    }

]);



/* =========================================================
   GENERADORES JAVASCRIPT
   ========================================================= */


/*
    PEDIR TEXTO
*/

javascriptGenerator.forBlock["pedir_texto"] =
    function(block) {

        const mensaje =
            block.getFieldValue("MENSAJE");


        const codigo =
            `window.prompt(${JSON.stringify(mensaje)}) ?? ""`;


        return [
            codigo,
            JavaScriptOrder.FUNCTION_CALL
        ];
    };



/*
    PEDIR NÚMERO
*/

javascriptGenerator.forBlock["pedir_numero"] =
    function(block) {

        const mensaje =
            block.getFieldValue("MENSAJE");


        const codigo =
            `Number(window.prompt(${JSON.stringify(mensaje)}) ?? 0)`;


        return [
            codigo,
            JavaScriptOrder.FUNCTION_CALL
        ];
    };



/*
    MOSTRAR
*/

javascriptGenerator.forBlock["mostrar"] =
    function(block, generator) {

        const valor =
            generator.valueToCode(
                block,
                "VALOR",
                JavaScriptOrder.NONE
            ) || '""';


        return `mostrarSalida(${valor});\n`;
    };



/* =========================================================
   GENERADORES PYTHON
   ========================================================= */


/*
    PEDIR TEXTO
*/

pythonGenerator.forBlock["pedir_texto"] =
    function(block) {

        const mensaje =
            block.getFieldValue("MENSAJE");


        const codigo =
            `input(${JSON.stringify(mensaje)})`;


        return [
            codigo,
            PythonOrder.FUNCTION_CALL
        ];
    };



/*
    PEDIR NÚMERO
*/

pythonGenerator.forBlock["pedir_numero"] =
    function(block) {

        const mensaje =
            block.getFieldValue("MENSAJE");


        const codigo =
            `float(input(${JSON.stringify(mensaje)}))`;


        return [
            codigo,
            PythonOrder.FUNCTION_CALL
        ];
    };



/*
    MOSTRAR
*/

pythonGenerator.forBlock["mostrar"] =
    function(block, generator) {

        const valor =
            generator.valueToCode(
                block,
                "VALOR",
                PythonOrder.NONE
            ) || '""';


        return `print(${valor})\n`;
    };



/* =========================================================
   TOOLBOX
   ========================================================= */

const toolbox = {

    kind: "categoryToolbox",

    contents: [

        /* -------------------------------------------------
           ENTRADA / SALIDA
           ------------------------------------------------- */

        {
            kind: "category",

            name: "Entrada / Salida",

            colour: "#0ea5e9",

            contents: [

                {
                    kind: "block",
                    type: "pedir_texto"
                },

                {
                    kind: "block",
                    type: "pedir_numero"
                },

                {
                    kind: "block",
                    type: "mostrar"
                }

            ]
        },


        /* -------------------------------------------------
           VARIABLES
           ------------------------------------------------- */

        {
            kind: "category",

            name: "Variables",

            colour: "#a855f7",

            custom: "VARIABLE"
        },


        /* -------------------------------------------------
           MATEMÁTICAS
           ------------------------------------------------- */

        {
            kind: "category",

            name: "Matemáticas",

            colour: "#3b82f6",

            contents: [

                {
                    kind: "block",
                    type: "math_number"
                },

                {
                    kind: "block",
                    type: "math_arithmetic"
                },

                {
                    kind: "block",
                    type: "math_modulo"
                }

            ]
        },


        /* -------------------------------------------------
           LÓGICA
           ------------------------------------------------- */

        {
            kind: "category",

            name: "Lógica",

            colour: "#22c55e",

            contents: [

                {
                    kind: "block",
                    type: "logic_compare"
                },

                {
                    kind: "block",
                    type: "logic_operation"
                },

                {
                    kind: "block",
                    type: "logic_negate"
                },

                {
                    kind: "block",
                    type: "logic_boolean"
                },

                {
                    kind: "block",
                    type: "controls_if"
                }

            ]
        },


        /* -------------------------------------------------
           CICLOS
           ------------------------------------------------- */

        {
            kind: "category",

            name: "Ciclos",

            colour: "#f59e0b",

            contents: [

                {
                    kind: "block",
                    type: "controls_repeat_ext"
                },

                {
                    kind: "block",
                    type: "controls_whileUntil"
                },

                {
                    kind: "block",
                    type: "controls_for"
                }

            ]
        },


        /* -------------------------------------------------
           TEXTO
           ------------------------------------------------- */

        {
            kind: "category",

            name: "Texto",

            colour: "#ec4899",

            contents: [

                {
                    kind: "block",
                    type: "text"
                },

                {
                    kind: "block",
                    type: "text_join"
                }

            ]
        }

    ]
};



/* =========================================================
   CREAR WORKSPACE
   ========================================================= */

const workspace =
    Blockly.inject(
        "blocklyDiv",
        {

            toolbox,

            trashcan: true,

            scrollbars: true,

            move: {

                scrollbars: true,

                drag: true,

                wheel: true

            },

            zoom: {

                controls: true,

                wheel: true,

                startScale: 0.9,

                maxScale: 1.5,

                minScale: 0.5,

                scaleSpeed: 1.1

            }

        }
    );



/* =========================================================
   ELEMENTOS DE INTERFAZ
   ========================================================= */

const salida =
    document.getElementById("salida");


const codigoPython =
    document.getElementById("codigo-python");


const btnEjecutar =
    document.getElementById("btn-ejecutar");


const btnLimpiar =
    document.getElementById("btn-limpiar");



/* =========================================================
   SALIDA
   ========================================================= */

function mostrarSalida(valor) {

    if (
        salida.textContent ===
        "Ejecuta tu algoritmo..."
    ) {

        salida.textContent = "";

    }


    salida.textContent +=
        String(valor) + "\n";
}



/* =========================================================
   MOSTRAR PYTHON
   ========================================================= */

function actualizarCodigo() {

    try {

        codigoPython.textContent =
            pythonGenerator.workspaceToCode(
                workspace
            );

    }

    catch (error) {

        codigoPython.textContent =
            "No se pudo generar Python.";

    }

}



workspace.addChangeListener(
    function(event) {

        if (event.isUiEvent) {

            return;

        }


        actualizarCodigo();

    }
);



/* =========================================================
   EJECUTAR ALGORITMO
   ========================================================= */

btnEjecutar.addEventListener(
    "click",
    function() {

        salida.textContent = "";


        try {

            /*
                Protección básica contra
                ciclos infinitos.
            */

            window.LoopTrap = 10000;


            javascriptGenerator.INFINITE_LOOP_TRAP =
                `
                if (--window.LoopTrap <= 0) {
                    throw new Error(
                        "El algoritmo parece contener un ciclo infinito."
                    );
                }
                `;


            const codigo =
                javascriptGenerator.workspaceToCode(
                    workspace
                );


            /*
                Ejecutamos solamente el JavaScript
                generado por los bloques.
            */

            const ejecutar =
                new Function(
                    "mostrarSalida",
                    codigo
                );


            ejecutar(
                mostrarSalida
            );


            if (
                salida.textContent.trim() === ""
            ) {

                salida.textContent =
                    "El algoritmo terminó sin mostrar resultados.";

            }

        }

        catch (error) {

            salida.textContent =
                "ERROR:\n" +
                error.message;

        }

    }
);



/* =========================================================
   LIMPIAR
   ========================================================= */

btnLimpiar.addEventListener(
    "click",
    function() {

        const confirmar =
            window.confirm(
                "¿Quieres borrar todos los bloques?"
            );


        if (!confirmar) {

            return;

        }


        workspace.clear();


        salida.textContent =
            "Ejecuta tu algoritmo...";

    }
);



/* =========================================================
   REDIMENSIONAR
   ========================================================= */

window.addEventListener(
    "resize",
    function() {

        Blockly.svgResize(
            workspace
        );

    }
);



/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

actualizarCodigo();
