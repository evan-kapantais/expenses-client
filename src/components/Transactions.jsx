import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import Transaction from './Transaction';
import NewTransaction from './NewTransaction';
import EditTransaction from './EditTransaction';

const Transactions = () => {
	const { transactions } = useContext(Context);
	const [newTransaction, setNewTransaction] = useState(false);
	const [editPanel, setEditPanel] = useState(false);
	const [editTransaction, setEditTransaction] = useState(null);

	return (
		<div className='block' id='block-transactions'>
			{transactions === null && <p>Loading...</p>}
			{newTransaction && (
				<NewTransaction setNewTransaction={setNewTransaction} />
			)}
			{editPanel && (
				<EditTransaction
					editTransaction={editTransaction}
					setEditPanel={setEditPanel}
				/>
			)}
			{transactions !== null && (
				<>
					<header>
						<h2>Transactions</h2>
					</header>
					<main>
						<ul>
							{transactions?.map((t) => (
								<Transaction
									key={t.id}
									transaction={t}
									setEditPanel={setEditPanel}
									setEditTransaction={setEditTransaction}
								/>
							))}
						</ul>
						<button
							type='button'
							className='button-add'
							onClick={() => setNewTransaction(true)}
						>
							Add
						</button>
					</main>
				</>
			)}
		</div>
	);
};

export default Transactions;
