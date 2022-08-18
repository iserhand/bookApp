import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import FormDialog from '../FormDialog/FormDialog';
function List(props) {
	const { isAdmin } = props;
	const [addOpen, setAddOpen] = useState(false);
	const handleAddPop = () => {
		setAddOpen(true);
	};
	const handleAddClose = () => {
		setAddOpen(false);
	};
	const { headers, title, colspan, handleInsertFailed, handleInsertSuccess, dialogType } = props;
	return (
		<TableContainer
			sx={{ minWidth: 350, width: 4 / 5, marginBottom: 15, height: 3 / 5 }}
			component={Paper}
			className=' overflow-scroll '
		>
			<Table
				stickyHeader
				sx={{ minWidth: 350, color: 'inherit' }}
				aria-label='simple table'
				className='bg-orange-300 '
			>
				<TableHead>
					<TableRow>
						<TableCell align='center' colSpan={colspan}>
							{title}
						</TableCell>
					</TableRow>
					<TableRow className='flex content-between'>
						{headers.map((header) => {
							return <TableCell key={header}>{header}</TableCell>;
						})}
					</TableRow>
				</TableHead>
				<TableBody>{props.children}</TableBody>
			</Table>
			{isAdmin && (
				<>
					<Fab
						sx={{ position: 'sticky', bottom: 16, right: 16 }}
						color='inherit'
						aria-label='add'
						onClick={handleAddPop}
					>
						<AddIcon />
					</Fab>
					<FormDialog
						open={addOpen}
						handleOpen={handleAddPop}
						handleClose={handleAddClose}
						handleInsertFailed={handleInsertFailed}
						handleInsertSuccess={handleInsertSuccess}
						dialogType={dialogType}
					></FormDialog>
				</>
			)}
		</TableContainer>
	);
}

export default List;
