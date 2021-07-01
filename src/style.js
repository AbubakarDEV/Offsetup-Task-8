import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    maindiv: {
        width: '60%',
        margin: "auto",
        marginBottom: "50px",
        marginTop: '50px'
    },
    form_div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        width: "100%",
        marginBottom: '20px'
    },
    errordiv: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        width: '230px'
    },
    select: {
        width:'230px',
    },
    check_box_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    errortext: {
        color: 'red'
    },
    textArea: {
        width: '230px',
        fontSize: '20px',
        height: '100px'
    },
    submit_btn: {
        width: '100%',
        marginTop: '50px'
    },
    Checkbox: {
        padding: 0,
        paddingRight: '5px'
    },
    formControl:{
        borderColor:"red",
        outlineColor:"red"
    }

}));

export default useStyles;