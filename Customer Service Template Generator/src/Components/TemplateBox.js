import React from 'react';
import FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';
import template from '../Base/atendimento-horario.json';
import { buildText } from '../util.js';
import { Download } from 'react-bootstrap-icons';

function TemplateBox({ data }) {
    template['0a2d7b49-9df3-4e94-9714-eefd7ed84a6e'].$enteringCustomActions[0].settings.source = buildText(data);

    const onSaveFile = () => {
        var blob = new Blob([JSON.stringify(template)], { type: "application/json;charset=utf-8" });
        FileSaver.saveAs(blob, "customer-service-template.json");
    }

    return (
        <div>

            <div className="text-center">
                <h2>Instructions</h2>
                <ol style={{ listStyleType: 'none' }}>
                    <li className="content-list-text">1. Download the generated template bellow</li>
                    <li className="content-list-text">2. Create a BLiP chatbot from  <b> the official customer service template</b>.</li>
                    <li className="content-list-text">3. Import the flow downloaded.</li>
                </ol>
                <hr />


                <Button className="center" size="lg" onClick={onSaveFile}><Download size={25} /> Download </Button>
            </div>

        </div>

    )
}

export default TemplateBox;
