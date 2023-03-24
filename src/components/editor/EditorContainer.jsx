import EditorToolbar, {modules, formats} from '../../components/editor/EditorToolbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorContainer = ({value, setValue, toolbarId}) => {
     return (
          <>
               <EditorToolbar toolbarId={toolbarId}/>
               <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder={"Введите текст..."}
                    modules={modules(toolbarId)}
                    formats={formats}
                    />
          </>
     )
}

export default EditorContainer;