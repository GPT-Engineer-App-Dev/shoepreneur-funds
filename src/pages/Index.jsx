import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Income", category: "Nike" },
    { id: 2, date: "2023-10-02", amount: 150, type: "Expense", category: "Adidas" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleAddTransaction = () => {
    setCurrentTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleSaveTransaction = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTransaction = {
      id: currentTransaction ? currentTransaction.id : transactions.length + 1,
      date: formData.get("date"),
      amount: formData.get("amount"),
      type: formData.get("type"),
      category: formData.get("category"),
    };

    if (currentTransaction) {
      setTransactions(transactions.map((transaction) => (transaction.id === currentTransaction.id ? newTransaction : transaction)));
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sneaker Accounting App</h1>
      </header>
      <div className="mb-4 text-right">
        <Button onClick={handleAddTransaction}>Add Transaction</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditTransaction(transaction)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentTransaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveTransaction}>
            <div className="space-y-4">
              <Input name="date" type="date" defaultValue={currentTransaction?.date || ""} required />
              <Input name="amount" type="number" defaultValue={currentTransaction?.amount || ""} required />
              <Select name="type" defaultValue={currentTransaction?.type || "Income"} required>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </Select>
              <Select name="category" defaultValue={currentTransaction?.category || "Nike"} required>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">{currentTransaction ? "Save Changes" : "Add Transaction"}</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;